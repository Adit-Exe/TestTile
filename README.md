# TestTile
[TestTile](https://testtile.vercel.app/) is an interactive, single-page application (SPA) that leverages the **Google Gemini API** to instantly generate customized multiple-choice quizzes on any topic provided by the user. It features dynamic configuration options, including timed tests and customizable scoring rules.

### Features
- TestTile provides a robust platform for testing knowledge with several customizable features:

- Instant Quiz Generation: Generate a quiz on any subject (e.g., history, coding, science, competitive exam preparation) by providing a simple text prompt.

- Dynamic Configuration: Customize quiz parameters before generation:

  - Question Count: Define the number of questions (up to 20).

  - Timer Control: Enable or disable a timer for the entire quiz.

  - Time per Question: Set a specific time limit for each question when the timer is active.

  - Negative Marking: Enable competitive exam-style scoring with custom points for correct answers and deductions for wrong answers.

- Real-time Feedback: Instantly updates user selections during the test.

- Detailed Results Analysis: View a final percentage score and a question-by-question breakdown of performance, including the correct answer for missed questions.

- Responsive UI: Designed with a clean, Material Design 3 (M3) inspired aesthetic using Tailwind CSS for optimal viewing on all devices.

### How It Works ?
The application operates as a state-driven SPA with a critical backend dependency for content generation.

#### 1. State Management
The core of the application is the React component state, which controls the entire flow.

### State Variables

| State Variable | Role |
|--------------------|----------|
| `gameState`    | Controls the active screen (home, input, quiz, results). |
| `config`      | Stores user-defined rules (timer, question count, scoring). |
| `questions`    | The generated quiz content from the API. |
| `userAnswers`  | Tracks the user's selected option for each question ID. |

#### 2. Quiz Generation Flow (API Interaction)
When a user clicks "Generate Quiz," the following process occurs:

The client-side application sends the user's `topic` and `questionCount` to a secure server endpoint (`/api/generate-quiz`).

(Hypothetical Server Proxy Action): The backend proxy receives the request, securely adds the Gemini API Key, and sends the prompt to the Gemini model to generate a structured JSON array of questions.

Robustness: The application uses an exponential backoff strategy for retrying failed API calls, ensuring reliability.

The application receives the structured quiz data, updates the `questions` state, and transitions the `gameState` to `'quiz'`.

#### 3. scoring
The `submitQuiz` function calculates the final score based on the configured rules:

- **Raw Score:** Points are added for correct answers (`scoreCorrect`) and deducted for wrong answers (`scoreWrong`), as defined in the user's configuration.

- **Final Percentage:** The raw score is normalized against the maximum possible score to provide a percentage score, ensuring results are always greater than or equal to 0%.
