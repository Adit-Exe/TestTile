import React from 'react'
import Box from "../Components/itmbox.js";
import Nav from "../Components/nav.js";
import Footer from "../Components/footer.js";


function store() {
    return (
        <>
            <Nav />
            <div className='sm:px-10 px-4 pb-10 bg-white'>

                <div className=' max-w-3xl'>
                    <h2 className='font-bold text-2xl mb-3 text-amber-500  pt-15'>Chutney</h2>
                    <p>Pickles & Chutneys Exotic Pickles Inspired by the rich tradition and fueled by the spirit of innovation, We created Ynot Pickles & Chutney- The perfect blend of innovation & Tradition.</p>
                </div>
                
                <div className="flex flex-wrap justify-evenly sm:gap-6 gap-3 sm:p-10 p-3 items-center border-b-8 mt-8 border-gray-100 sm:h-max flex-row w-[100%] self-center justify-self-center bg-gray-100 rounded-lg ">
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                </div>



                <div className=' max-w-3xl'>
                    <h2 className='font-bold text-2xl mb-3 text-amber-500  mt-15'>Bamboo Shoot</h2>
                    <p>Bamboo Shoot Northeast India is a hub of exotic fruits, vegetables and spices. Fermented Bamboo shoot and dry bamboo shoot is the most popular ingredient in many Asian cuisines.</p>
                </div>
                 <div className="flex flex-wrap justify-evenly sm:gap-6 gap-3 sm:p-10 p-3 items-center border-b-8 mt-8 border-gray-100 sm:h-max flex-row w-[100%] self-center justify-self-center bg-gray-100 rounded-lg ">
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                </div>


                <div className=' max-w-3xl'>
                    <h2 className='font-bold text-2xl mb-3 text-amber-500  mt-15'>Mouth Freshners</h2>
                    <p>Natural Mouth Freshener We at Ynot Food Products fully concentrate on natural mouth freshener which helps you to healthy and nutritional. Natural Mouth Freshener stops the desire for fried stuff.</p>
                </div>
                 <div className="flex flex-wrap justify-evenly sm:gap-6 gap-3 sm:p-10 p-3 items-center border-b-8 mt-8 border-gray-100 sm:h-max flex-row w-[100%] self-center justify-self-center bg-gray-100 rounded-lg ">
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                </div>



                <div className=' max-w-3xl'>
                    <h2 className='font-bold text-2xl mb-3 text-amber-500  mt-15'>Spices</h2>
                    <p>King Chilli King Chilli grown in North East India is one of the hottest known chillies on the earth. King Chilli is a wonderful gift of Nature! The King chilli.</p>
                </div>
                 <div className="flex flex-wrap justify-evenly sm:gap-6 gap-3 sm:p-10 p-3 items-center border-b-8 mt-8 border-gray-100 sm:h-max flex-row w-[100%] self-center justify-self-center bg-gray-100 rounded-lg ">
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                </div>


                <div className=' max-w-3xl'>
                    <h2 className='font-bold text-2xl mb-3 text-amber-500  mt-15'>Pickles</h2>
                    <p>Pickles & Chutneys Exotic Pickles Inspired by the rich tradition and fueled by the spirit of innovation, We created Ynot Pickles & Chutney- The perfect blend of innovation & Tradition.</p>
                </div>
                <div className="flex flex-wrap justify-evenly sm:gap-6 gap-3 sm:p-10 p-3 items-center border-b-8 mt-8 border-gray-100 sm:h-max flex-row w-[100%] self-center justify-self-center bg-gray-100 rounded-lg ">
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                    <Box title="Product Name" price="₹123" img="/images/mockup.jpg" />
                </div>

            </div>
 <Footer />

        </>
    )
}

export default store