import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from '../ui/textarea';
import InfoContext from '@/assets/infoContext';
import { Button } from '../ui/button';
import { LoaderPinwheelIcon } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { toast } from "sonner"
import { useParams } from 'react-router-dom';
import Global_API from './../../../service/Global_API';
import { AIChatSession } from './../../../service/AIModel';
const prompt = "The Job Title is {jobTitle} , based on the job title give me a summary with 5-6 lines for my resume in JSON Format with experience level and Summary with Experience level as (expLevel) for Junior, Intermediate, and Expert "

function PersonalSum({enableNext}) {
  const { resumeInfo, setResumeInfo } = useContext(InfoContext);  
 
  const user = useUser();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [generatedSum, setGeneratedSum] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    enableNext(false)
    setFormData({
      ...formData,
      [name]: value
    });

    setResumeInfo({
      ...resumeInfo,
      [name]: value
    });
  };

  const handleDivClick = (summary) => {
    setSelectedSummary(summary);
    setFormData({
      ...formData,
      summary: summary // Update formData with the selected summary
    });

    setResumeInfo({
      ...resumeInfo,
      summary: summary
    });
  };

  const generateAISummary = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    console.log(PROMPT);
    
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      let rawText = result.response.text().trim();
      rawText = `[${rawText}]`;  // Add square brackets around the string if needed

      const parsedData = JSON.parse(rawText); // Parse the JSON
      setGeneratedSum(parsedData);
      console.log("sucess", parsedData)
     
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
      toast("Failed to generate AI summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text, limit) => {
    if (typeof text !== 'string') {
      return '';  // Return an empty string if `text` is not valid
    }
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Form data', formData);
    const data = { data: formData };
    console.log('data', data);
    
    Global_API.UpdateResume(params?.resumeid, data)
      .then((resp) => {
        console.log('API put Success', resp);
        setLoading(false);
        toast("Resume Updated");
        enableNext(true)
      })
      .catch((error) => {
        console.error('Api put failed', error);
        setLoading(false);
        toast("Error in updating resume");
      });
  };

  return (
    <div className='Exp-prev h-5/6'>
      <h2 className='text-xl font-bold'>Personal Summary</h2>
      <form className='Exp-prev h-4/6' onSubmit={onSave}>
        <div className='Exp-prev h-full'>
          <label className='font-bold'>Enter Personal Summary/Objective</label>
                  <Button 
          variant="orange" 
          onClick={generateAISummary} 
          type="button" 
          size="sm" 
          className="flex justify-end mt-2 mb-2" 
          disabled={loading}
        >
          {loading ? <LoaderPinwheelIcon className="animate-spin" /> : 'Generate With AI'}
        </Button>
<div className="h-full">
            <Textarea 
              name="summary" 
              value={selectedSummary || resumeInfo?.summary} // Controlled value
              className='h-2/6' 
              required 
              onChange={handleChange} 
            />
            <div className='mt-6 flex justify-end'>
              <Button type="submit" size="sm" disabled={loading}>
                {loading ? <LoaderPinwheelIcon className='animate-spin' /> : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </form>
      {generatedSum && 
      <div className="generated">
        <h2>Suggestions</h2>
        {generatedSum.map((item, index) => (
          <div 
            key={index} 
            className="sugg-dis" 
            onClick={() => handleDivClick(item.Summary)}
            style={{ cursor: 'pointer', padding: '10px', margin: '5px', border: '1px solid #ccc' }}
          >
            <h2>Level: {item.expLevel}</h2>
            <p>Summary: {item.Summary} </p>
          </div>
        ))}
      </div>
      }
    </div>
  )
}

export default PersonalSum;