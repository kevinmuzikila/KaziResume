import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoaderPinwheelIcon } from 'lucide-react';
import InfoContext from '@/assets/infoContext';
import { useContext } from 'react';
import { Textarea } from '../ui/textarea';
import Global_API from './../../../service/Global_API';
import { useParams } from 'react-router-dom';
import { error } from 'console';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';

const formField = {
    universityName: "",
    degree: "",
    major: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const PROMPT = "The Qualification and Major is {Degree}, based on the job title give me a 1-2 lines for eduction description for my resume "


function PersonalEdu({enableNext}) {
const [educationInfo, setEducationInfo] = useState([formField]);
const [loading, setLoading] = useState(false);
const { resumeInfo, setResumeInfo } = useContext(InfoContext);
const [genDescription, setGenDescription ] = useState();
const params=useParams;

  useEffect (() => {
    console.log(educationInfo)
      setResumeInfo ({
        ...resumeInfo,
        education: educationInfo
      })
  }, [educationInfo])

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
        })
          
      };

      const handleChange = (index,e) => {
        const newEntries = educationInfo.slice();
        const {name,value} = e.target;
        newEntries[index][name] = value;
        setEducationInfo(newEntries);
      }
    
      const generateAISummary = async (index) => {
        setLoading(true);
        try {
          if (!resumeInfo?.eduction[index]) {
            throw new Error('Education data is missing');
          }
      
          const prompt = PROMPT.replace('{Degree}', resumeInfo?.eduction[index].degree + ' ' + resumeInfo?.eduction[index].major);
          console.log(prompt);
      
          const result = await AIChatSession.sendMessage(prompt);
          console.log(result);
      
          setGenDescription(result);
        } catch (error) {
          console.error('Error generating AI summary:', error);
        } finally {
          setLoading(false);
        }
      };
      


      const addNew = () => {
        setEducationInfo([...educationInfo, formField]);
      };
    
      const deleteExp = () => {
        setEducationInfo(educationInfo=>educationInfo.slice(0, -1));
      };
    
  return (
    <div className="Exp-prev">
    <h2 className="text-xl font-bold">Education</h2>
    <form className="Exp-prev h-full" onSubmit={onSave}>
    {educationInfo.map((item, index) => (
          <div key={index} className="exp-box">
            <div>
              <label>Institution </label>
              <Input name="universityName" defaultValue={resumeInfo?.education[index].universityName } onChange={(event) => handleChange(index, event)} />
            </div>
            <div className="grid grid-cols-2 mt-5 gap-3">
              <div>
                <label>Qualification</label>
                <Input name="degree" required onChange={(event) => handleChange(index, event)} />
              </div>
              <div>
                <label>Major</label>
                <Input name="major" required onChange={(event) => handleChange(index, event)} />
              </div>
            </div>
            <div className="grid grid-cols-2 mt-5 mb-3 gap-3">
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  required
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
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
                  variant="secondary"
                  onClick={() => generateAISummary(index)}
                >
                  Generate with AI
                </Button>
              </div>
              <div>
            <Textarea 
              name="description" 
              value={resumeInfo?.education[index].description} // Controlled value
              className='h-2/6' 
              required 
              onChange={(event) => handleChange(index, event)}
            />
            </div>
            </div>
          </div>
        ))}
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
              variant="outline"
              type="button"
              size="sm"
              onClick={addNew}
            >
              Add
            </Button>
          </div>
          <Button type="submit" size="sm" disabled={loading}>
            {loading? <LoaderPinwheelIcon className="animate-spin" /> : "Save"}
          </Button>
        </div>
    </form>
    </div>
  )
}

export default PersonalEdu;