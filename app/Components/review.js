import React from 'react'
import Revbox from './revbox.js' 

function review() {
  return (
    <div className="w-full overflow-x-auto pb-10">
      <div className="flex gap-0 sm:gap-10 flex-nowrap px-4 ">
        <Revbox
          name="Bidyut Kalita"
          review="The Y Not Food products pickle are very tasty, I really love it. I am buying this since 2 years and eating it daily in breakfast. Everyone must try them once in life. you will love this"
        />
        <Revbox
          name="Hirak Jyoti Baishya"
          review="It's best for the price, and also full of good taste, I affirm that those pickles have no foul smell, doesn't leave bitter after taste, so concluded that the oil used is good."
        />
        <Revbox
          name="Rashmi Chauhan"
          review="Finally I find one of best place in Guwahati for buy pickle and food product. Thanks to Y Not Food Products."
        />
        <Revbox
          name="Sanjeev Das"
          review="In beginning I bought only one small pack to try the dry mango pickle, and I'm happy to buy this. Lovely aroma like homemade. Best pickles!"
        />
      </div>
    </div>
  );
}


export default review