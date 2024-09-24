import React from 'react'

function Objective({resumeInfo}) {
  return (
    <div>
      <div className="summ-prev">
      <h2 className='text-xl font-bold'>Personal Summary </h2>
      <p className='text-light text-xs'>{resumeInfo?.summary} </p>
      </div>
    </div>
  )
}

export default Objective