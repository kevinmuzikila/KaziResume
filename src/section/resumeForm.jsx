import InfoContext from '@/assets/infoContext';
import EducationDetails from '@/components/form/educationDetails';
import PersonalDetails from '@/components/form/PersonalDetails';
// import PersonalEdu from '@/components/form/personalEdu';
// import PersonalEdu from '@/components/form/personalEdu';
import PersonalExp from '@/components/form/personalExp';
import PersonalLanguage from '@/components/form/personalLanguage';
import PersonalRef from '@/components/form/personalRef';
import PersonalSkills from '@/components/form/personalSkills';
import PersonalSum from '@/components/form/personalSum';
import Education from '@/components/preview/education';
import { Button } from '@/components/ui/button';
import { ArrowBigRightDash, ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';

function ResumeForm() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext ] = useState(true);
  const {resumeid} = useParams();
  const { resumeInfo, setResumeInfo } = useContext(InfoContext);
  const handleClick = ( ) => {
    
  }
  return (
    <div className='form-page '>

      <div className="form-top ">
    
      <h2 className='font-bold uppercase'> Editing "{resumeInfo.title}" </h2>
      <div className='flex justify-center gap-2'>
     {activeFormIndex > 1  && <Button size="sm" onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/></Button>}
      {activeFormIndex < 7 && <Button size="sm" disabled={!enableNext} onClick={()=>setActiveFormIndex(activeFormIndex+1)}> Next <ArrowRight/> </Button>}
      {activeFormIndex === 7  && <Link to={'/viewResume/'+resumeid+"/view"}><Button size="sm" disabled={!enableNext} onClick={handleClick()}> Done </Button> </Link>}
      </div>
     
      </div>
       {activeFormIndex==1? <PersonalDetails enableNext={(v)=>setEnableNext(v)} /> : null }
       {activeFormIndex==2? <PersonalSum enableNext={(v)=>setEnableNext(v)} /> : null }
       {activeFormIndex==3? <PersonalExp enableNext={(v)=>setEnableNext(v)} /> : null }
       {activeFormIndex==4? <EducationDetails enableNext={(v)=>setEnableNext(v)} /> : null }
      {activeFormIndex==5? <PersonalSkills enableNext={(v)=>setEnableNext(v)} /> : null  }
     {activeFormIndex==6? <PersonalLanguage enableNext={(v)=>setEnableNext(v)} /> : null}
      {activeFormIndex==7? <PersonalRef enableNext={(v)=>setEnableNext(v)} /> : null}
     

    </div>
  )
}

export default ResumeForm;