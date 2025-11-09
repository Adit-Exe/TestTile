import React from 'react'
import Image from 'next/image'


function pbox(props) {
  return (
    <div className="shadow-2xl h-fit w-fit p-2 sm:rounded-xl rounded-md flex flex-col items-center mb-20 shadow-amber-600/20 bg-white hover:scale-105 duration-500 ease-out">
      <Image
        src={props.img}
        alt=""
        width={100}
        height={100}
        className="rounded-xl min-w-36"
      />
      <h1 className="text-md text-wrap text-center mt-3">{props.title}</h1>
    </div>
  );
}


export default pbox