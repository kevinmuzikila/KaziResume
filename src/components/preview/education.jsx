import React from 'react'

function Education({resumeInfo}) {
  return (
    <div className="Exp-prev">
        <h2 className='text-xl font-bold '>Education </h2>
        <div>
            {resumeInfo?.education.map((experience,index)=>
            <div className="text-light text-xs dis-details mt-2" key={index}>
                <h2 className='font-bold '>{experience?.universityName}</h2>
                    <div className="exp-1">
                    <h2 >{experience?.degree} - {experience?.major}, {experience?.state} </h2>
                    <p>{experience?.startDate} - {experience?.currentlyWorking?'Present':experience?.endDate}</p>
                    </div>
                    <div className="wrk-summ mt-2">
                        <p>{experience?.description }</p>
                    </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default Education