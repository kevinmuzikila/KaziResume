import React from 'react'

function SkillsPrev({resumeInfo}) {
  return (
    <div>
         <div className="Exp-prev">
         <h2 className='text-xl font-bold '> Skills </h2>

         
            <div className='grid grid-cols-2 mt-5 gap-3'>
            {resumeInfo?.skills.map((skills,index)=>
            <div className="text-light text-xs dis-details mt-2" key={index}>
              
                <div className="exp-1">
                    <h2 className='font-bold ' >{skills?.name} </h2>
                    <div className="ProgressBar" >
                    <div  className='h-full' style={{
                            backgroundColor: 'rgba(6, 120, 250, 0.801)', //resumeInfo?.themeColor,
                            width: skills?.rating*20+'%'
                        }}>
                      
                    </div>
                    </div>
                    
                    </div>
            </div>
            )}
        </div>
    </div>
    </div>
  )
}

export default SkillsPrev