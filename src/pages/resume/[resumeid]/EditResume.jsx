import InfoContext from "@/assets/infoContext";
import dummy from "@/section/dummy";
import ResumeForm from "@/section/resumeForm";
import ResumePreview from "@/section/resumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Global_API from './../../../../service/Global_API';

function EditResume() {
  const { resumeid } = useParams();
  const [resumeInfo, setResumeInfo] = useState(dummy); // Initialize with dummy
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    console.log(resumeid);  // Ensure that resumeid is received correctly
    getResumeInfo();
  }, [resumeid]);  // Add resumeid as a dependency to the effect

  const getResumeInfo = () => {
    Global_API.GetResumeInfo(resumeid)
      .then((resp) => {
        console.log('obj', resp.data);  // Ensure data is received
        setResumeInfo(resp.data);  // Update state with fetched data
        setLoading(false);  // Set loading to false when data is received
      })
      .catch((error) => {
        console.log('Data not loaded:', error);  // Proper error handling
        setLoading(false);  // Stop loading even on error
      });
  };

 

  return (
    <InfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
     
      <div className="resume-form">
        <div className="r-form">
          <ResumeForm />
        </div>
        { loading ? <div className='loader top-80 '></div> : ''}
        <div className="r-preview">
          <ResumePreview />
        </div>
      </div>
    </InfoContext.Provider>
  );
}

export default EditResume;
