import InfoContext from '@/assets/infoContext';
import ExpPreview from '@/components/preview/expPreview';
import Objective from '@/components/preview/Objective';
import PersonalDetail from '@/components/preview/personalDetail';
import React from 'react'
import { useContext } from "react";
import './../App.css'
import Education from '@/components/preview/education';
import SkillsPrev from '@/components/preview/skillsPrev';
import Languages from '@/components/preview/languages';
import Reference from '@/components/preview/reference';

function ResumePreview() {
    const {resumeInfo, setResumeInfo} = useContext(InfoContext);
    
      const handleChangeColor = (color) => {
        document.documentElement.style.setProperty('--color', color);
        // document.documentElement.style.setProperty('--tr', color);
      };

  return (
    <div className="resume-page h-full" id="dont-over">
        
        <div className="">
          <PersonalDetail resumeInfo={resumeInfo} />
          <Objective resumeInfo={resumeInfo} />
          <ExpPreview resumeInfo={resumeInfo}/>
          <Education resumeInfo={resumeInfo}/>
          < SkillsPrev resumeInfo={resumeInfo}/>
          < Languages resumeInfo={resumeInfo} />
          < Reference resumeInfo={resumeInfo} />
          
        </div>
      
    </div>
  )
}

export default ResumePreview;