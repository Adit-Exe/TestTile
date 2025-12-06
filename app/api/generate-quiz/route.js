import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { topic, config } = await request.json();

        if (!topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const prompt = `
      Generate ${config.questionCount} multiple choice questions about the topic: "${topic}".
      
      Strictly follow this JSON format for the response. Do not include markdown formatting, backticks, or any text outside the JSON array:
      [
        {
          "id": 1,
          "question": "Question text here",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "The exact string of the correct option"
        }
      ]
      Ensure the "answer" matches one of the "options" exactly.
    `;

        const MAX_RETRIES = 3;
        let response;
        let error;

        for (let i = 0; i < MAX_RETRIES; i++) {
            try {
                response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                        }),
                    }
                );

                if (response.ok) {
                    error = null;
                    break;
                }

                error = new Error(`API returned ${response.status}`);
            } catch (e) {
                error = e;
            }

            // Exponential backoff
            if (i < MAX_RETRIES - 1) {
                const delay = Math.pow(2, i) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        if (error || !response || !response.ok) {
            throw error || new Error('Failed to fetch from AI service');
        }

        const data = await response.json();
        let textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResponse) {
            return NextResponse.json({ error: 'No content generated' }, { status: 500 });
        }

        // Clean up markdown fences if the model included them
        textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsedQuestions = JSON.parse(textResponse);

        // Ensure we respect the count if the AI generated slightly different amount
        const limitedQuestions = parsedQuestions.slice(0, config.questionCount);

        return NextResponse.json(limitedQuestions);

    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
