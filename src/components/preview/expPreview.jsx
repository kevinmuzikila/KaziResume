import React from 'react'

function ExpPreview({resumeInfo}) {
  return (
    <div className="Exp-prev">
        <h2 className='text-xl font-bold '>Experience </h2>
        <div>
            {resumeInfo?.experience.map((experience,index)=>
            <div className="text-light text-xs dis-details mt-2" key={index}>
                <h2 className='font-bold '>{experience?.title}</h2>
                    <div className="exp-1">
                    <h2 >{experience?.companyName} - {experience?.city}, {experience?.state} </h2>
                    <p>{experience?.startDate} - {experience?.currentlyWorking?'Present':experience?.endDate}</p>
                    </div>
                    <div className="wrk-summ mt-2">
                        {/* <p>{experience?.workSummary }</p> */}
                        <div dangerouslySetInnerHTML={{__html:experience?.workSummary}} />
                          
                    </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default ExpPreview;