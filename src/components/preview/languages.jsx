import React from 'react'

function Languages({resumeInfo}) {
  return (
    <div className="Exp-prev">
         <h2 className='text-xl font-bold '> Languages </h2>

         <div className='grid grid-cols-1 mt-5 gap-3'>
            {resumeInfo?.language.map((language,index)=>
            <div className="text-light text-xs dis-details mt-2" key={index}>
              
                <div className="exp-1">
                    <h2 className='font-bold ' >{language?.name} </h2>
                    <div className="ProgressBar" >
                    <div  className='h-full' style={{
                            backgroundColor: 'rgba(6, 120, 250, 0.801)', //resumeInfo?.themeColor,
                            width: language?.rating*20+'%'
                        }}>
                      
                    </div>
                    </div>
                    
                    </div>
            </div>
            )}
        </div>

         </div>
  )
}

export default Languages;