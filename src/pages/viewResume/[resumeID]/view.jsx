import InfoContext from "@/assets/infoContext";
import { Button } from "@/components/ui/button";
import ResumePreview from "@/section/resumePreview";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Global_API from "./../../../../service/Global_API";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeID } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const handledownload = () => {
    window.print();
  };

  const GetResumeInfo = () => {
    setLoading(true);
    Global_API.GetResumeInfo(resumeID).then((resp) => {
      console.log(resp.data);
      setResumeInfo(resp.data);
      setLoading(false);
    });
  };

  return (
    <InfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div  className="">
        <div id="no-print"className="flex justify-center items-center flex-col w-screen border-2 " >
          <h2 className="text-3xl font-bold mb-2">
            {" "}
            Congrats, your resume is ready🎉!{" "}
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            You can now share or download your resume.
          </p>

          <div className="flex space-x-4 mb-8">
            <Button
              onClick={handledownload}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Download
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
              Share
            </Button>
          </div>
          <div id="no-print">
          {loading? <div className='w-screen flex justify-center align-center'><div className='loader '> </div>  </div> : '' }
      
          </div>
        </div>

        <div
          id="print-area"
          className="px-48"
        >
          <ResumePreview id="print-area"  />
        </div>
      </div>
    </InfoContext.Provider>
  );
}

export default ViewResume;
