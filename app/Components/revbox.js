import React from 'react'

function revbox(props) {
  return (
    <div className="w-80 bg-white shadow-2xl shadow-amber-600/20 p-4 rounded-2xl h-fit scale-[0.9] sm:scale-100 flex-shrink-0 hover:scale-105 duration-500 ease-out ">
      <h2 className="font-bold mb-3 text-xl">{props.name}</h2>
      <p>{props.review}</p>
      <div className="mt-3 flex gap-1">
        <i className="fa-solid fa-star text-amber-300"></i>
        <i className="fa-solid fa-star text-amber-300"></i>
        <i className="fa-solid fa-star text-amber-300"></i>
      </div>
    </div>
  );
}


export default revbox