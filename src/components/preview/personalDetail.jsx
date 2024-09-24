import React from 'react'

function PersonalDetail({resumeInfo}) {
  return (
    <div className='person-preview'>

   <div>
   <h2 className='text-4xl font-bold '> {resumeInfo?.firstName} {resumeInfo?.lastName} </h2>
   <h2 className='text-xl font-bold'>{resumeInfo?.jobTitle}</h2>
   </div>

   <div className="text-light text-xs personal-det">
  <p><span className="font-bold">Email:</span> {resumeInfo?.email}</p>
 <div className='address'> <p><span className="font-bold">Address:</span> {resumeInfo?.address}</p></div><br/>
  <p><span className="font-bold">Cell No:</span> {resumeInfo?.phone}</p>
  <p><span className="font-bold">Date Of Birth:</span> {resumeInfo?.dob}</p>
  <p><span className="font-bold">Nationality:</span> {resumeInfo?.nationality}</p>
</div>

    </div>
  )
}

export default PersonalDetail;