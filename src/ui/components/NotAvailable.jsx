import React from 'react'

export default function NotAvailable({cls,sub}) {
  return (
    <div className="px-5 py-8 flex-1 w-full lg:max-w-4xl mx-auto flex flex-col overflow-hidden min-h-[100vh]">
    <div className="w-full flex flex-col flex-1 items-center z-10">
      <a href="https://www.studifysuccess.com/"><h1 className="text-[#008b8b] font-bold text-[40px] sm:text-4xl">
        studifysuccess
      </h1></a>

      <h1 className="text-black  mt-[25vh] sm:text-2xl">
        We're sorry, the {sub} quiz for {cls} class is not available right now.
      </h1  >

    
    </div>
   
  </div>
  )
}
