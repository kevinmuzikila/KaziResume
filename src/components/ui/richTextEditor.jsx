import InfoContext from '@/assets/infoContext';
import React, { useContext, useEffect, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { Button } from './button';
import { toast } from "sonner";
import { AIChatSession } from "./../../../service/AIModel";
import { LoaderPinwheelIcon } from 'lucide-react';

const EXPROMPT =  "The job title/position is {title}. Please generate 5-6 bullet points describing the key responsibilities, achievements, and contributions relevant to this role, dont catergories them into junior, senior or intermidiate. Make sure the bullet points are suitable for inclusion in a professional resume. Format the results in HTML with appropriate <ul> and <li> tags.";

function RichTextEditor({ onRichEditChange, index, defaultValue}) {
  const { resumeInfo, setResumeInfo } = useContext(InfoContext);  // Accessing context
  const [value, setValue] = useState(defaultValue);  // Local state for editor content
  const [loading, setLoading] = useState(false);

  // Load content from global state when component mounts
  useEffect(() => {
    if (resumeInfo.experience[index]?.workSummary) {
      setValue(resumeInfo.experience[index].workSummary);  // Load the saved content
    }
  }, [resumeInfo, index]);

  const GenerateAISummary = async () => {
    setLoading(true);

    if (!resumeInfo.experience[index].title) {
      toast('Please add job title/position');
      setLoading(false);
      return;
    }

    const prompt = EXPROMPT.replace('{title}', resumeInfo.experience[index].title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const resp = await result.response.text();  // Await the text content from AI
      const cleanResp = resp.replace('[', '').replace(']', '');  // Clean up response

      const updatedValue = value + cleanResp;  // Append AI-generated content to current content
      setValue(updatedValue);  // Update local state
      onRichEditChange({ target: { value: updatedValue } });  // Update parent component

      // Update the global state
      const newExperience = [...resumeInfo.experience];
      newExperience[index].workSummary = updatedValue;
      setResumeInfo({
        ...resumeInfo,
        experience: newExperience,
      });

    } catch (error) {
      console.error('Error fetching AI summary:', error);
      toast("Error generating summary");
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (e) => {
    const updatedValue = e.target.value;
    setValue(updatedValue);  // Update local state
    onRichEditChange(e);  // Update parent component

    // Save content to global state
    const newExperience = [...resumeInfo.experience];
    newExperience[index].workSummary = updatedValue;
    setResumeInfo({
      ...resumeInfo,
      experience: newExperience,
    });
  };

  return (
    <div>
      <div className="flex justify-between mt-3 mb-2">
        <label>Work Summary</label>
        <Button
          type="button"
          size="sm"
          variant="orange"
          disabled={loading}
          onClick={GenerateAISummary}
        >
          {loading ? <LoaderPinwheelIcon className="animate-spin" /> : "Generate with AI"}
        </Button>
      </div>

      <EditorProvider>
        <Editor value={value} onChange={handleEditorChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnBulletList />
            <BtnNumberedList />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
