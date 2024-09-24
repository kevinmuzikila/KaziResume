import React from 'react'

function Reference({resumeInfo}) {
  return (
    <div className="Exp-prev">
         <h2 className='text-xl font-bold '> Reference </h2>

         <div className='grid grid-cols-2 mt-5 gap-3'>
            {resumeInfo?.reference.map((reference,index)=>
            <div className="text-light text-xs dis-details mt-2" key={index}>
              
                <div className=" ">
                    <h2 className='font-bold ' >Full Name: {reference?.name} </h2>
                    <p>Company: {reference?.company} </p>
                    <p>Role: {reference?.role}  </p>
                    <p>Contact no: {reference?.contact} </p>
                  
                    
                    </div>
            </div>
            )}
        </div>
         </div>
  )
}

export default Reference;