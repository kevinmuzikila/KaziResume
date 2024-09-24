import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner"
import React from 'react'
import RichTextEditor from "../ui/richTextEditor";
import InfoContext from "@/assets/infoContext";
import { AIChatSession } from "./../../../service/AIModel";
import { LoaderPinwheelIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import Global_API from "./../../../service/Global_API";

const formField = {
    universityName: "",
    degree: "",
    major: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const PROMPT = "The Qualification and Major is {Degree}, based on the job title give me a 2-4 lines for eduction description for my resume "



function EducationDetails({enableNext}) {
 const [educationInfo, setEducationInfo] = useState([formField]);
const [loading, setLoading] = useState(false);
const { resumeInfo, setResumeInfo } = useContext(InfoContext);
const [genDescription, setGenDescription ] = useState();
const params = useParams();

useEffect (() => {
  resumeInfo && setEducationInfo(resumeInfo?.education)
 }, []);

const onSave = (e) => {
  e.preventDefault();
  setLoading(true);

  const data = {
    data:{
      education: educationInfo
    }
  }
  console.log(data);

  Global_API.UpdateResume(params.resumeid,data).then(resp=>{
    console.log(resp);
    setLoading(false);
    toast('Update SucessFul  ')
    enableNext(true)
  }).catch((error) => {
    console.error('Api put failed', error);
    setLoading(false);
    toast("Error in updating resume");
  });
    
};

useEffect (() => {
  console.log(educationInfo)
    setResumeInfo ({
      ...resumeInfo,
      education: educationInfo
    })
}, [educationInfo])

const handleChange = (index,e) => {
  const newEntries = educationInfo.slice();
  const {name,value} = e.target;
  newEntries[index][name] = value;
  setEducationInfo(newEntries);
  enableNext(false)
}

const deleteExp = () => {
  setEducationInfo(educationInfo=>educationInfo.slice(0, -1));
}
const addNew = () => {
    setEducationInfo([...educationInfo, formField]);
}

const generateAISummary = async (index) => {
  setLoading(true);
  
  try {
    if (!resumeInfo?.education[index]) {
      throw new Error('Education data is missing');
    }

    const prompt = PROMPT.replace('{Degree}', resumeInfo?.education[index].degree + ' ' + resumeInfo?.education[index].major);
    console.log(prompt);

    const result = await AIChatSession.sendMessage(prompt);
    console.log('data', result.response.text() );

    setGenDescription(result.response.text());
    const updatedValue = genDescription

    const newExperience = [...resumeInfo.education];
      newExperience[index].description = updatedValue;
      setResumeInfo({
        ...resumeInfo,
        education: newExperience,
      });

  } catch (error) {
    console.error('Error generating AI summary:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="Exp-prev">
    <h2 className="text-xl font-bold">Education</h2>
    <div className="for-overflow">
    
   <form className="all-form h-full" >

   {educationInfo.map((item, index) => (
        <div  key={index} className="cont-exp-form mt-2">
                 <div>
              <label>Institution </label>
              <Input name="universityName" value={item.universityName}  onChange={(event) => handleChange(index, event)} />
            </div>
            <div className="grid grid-cols-2 mt-5 gap-3">
              <div>
                <label>Qualification Type</label>
                <Input name="degree" required value={item.degree} onChange={(event) => handleChange(index, event)} />
              </div>
              <div>
                <label>Major</label>
                <Input name="major" required value={item.major} onChange={(event) => handleChange(index, event)} />
              </div>
            </div>
            <div className="grid grid-cols-2 mt-5 mb-3 gap-3">
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  value={item.startDate}
                  name="startDate"
                  required
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  value={item.endDate}
                  name="endDate"
                  required
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mt-3 mb-2">
                <label>Description </label>
                
                <Button
                  type="button"
                  size="sm"
                  variant="orange"
                  onClick={() => generateAISummary(index)}
                >
                 {loading ? <LoaderPinwheelIcon className="animate-spin" /> : 'Generate With AI'}
                 
                </Button>
              </div>
              <div>
            <Textarea 
              name="description" 
              // Controlled value
              className='h-2/6'
              value={item.description}
              required 
              onChange={(event) => handleChange(index, event)}
            />
            </div>
            </div>
      </div>   
    
    ))}
     
   </form>
     </div>
     <div className="mt-3 flex justify-between gap-3">
          <div className="btuut">
            <Button
             className="me-2"
              variant="destructive"
              type="button"
              size="sm"
              onClick={deleteExp}
            >
              Delete
            </Button>

            <Button
              variant="add"
              type="button"
              size="sm"
              onClick={addNew}
            >
              Add
            </Button>
          </div>
          <Button type="submit" size="sm" disabled={loading} onClick={onSave}>
            {loading? <LoaderPinwheelIcon className="animate-spin" /> : "Save"}
          </Button>
        </div>
    </div>
  )
}

export default EducationDetails