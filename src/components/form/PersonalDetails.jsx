import React, { useContext, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import InfoContext from '@/assets/infoContext';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../ui/button';
import { ArrowBigDownDashIcon, LoaderPinwheelIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Global_API from './../../../service/Global_API';
import { toast } from 'sonner';

function PersonalDetails({enableNext}) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(InfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useUser();
 

  useEffect(() => {
    resumeInfo && setFormData(resumeInfo);
    console.log('obj', params);

    const filteredResumeInfo = {}; // Create an empty object
    ['firstName', 'lastName', 'email', 'address', 'phone', 'dob', 'nationality', 'jobTitle'].forEach((field) => {
      if (resumeInfo[field]) {
        filteredResumeInfo[field] = resumeInfo[field];
      }
    });
    setFormData(filteredResumeInfo);
    console.log('Filtered Resume Info:', filteredResumeInfo);
    
  }, [resumeInfo, params]);

  const handleChange = (e) => {
   
    const { name, value } = e.target;
    enableNext(false);
    setFormData({
      ...formData,
      [name]: value
    });

    setResumeInfo({
      ...resumeInfo,
      [name]: value
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Form data', formData )
    const data = {data: formData };
    console.log('data', data )
    


    Global_API.UpdateResume(params?.resumeid , data)
      .then((resp) => {
        console.log('API put Success ', resp);
        setLoading(false);
        toast("Resume Updated ")
        enableNext(true);
      })
      .catch((error) => {
        console.error('Api put failed', error);
        setLoading(false);
        toast("Error in updating resume ")
      });
  };

  return (
    <form className='Exp-prev' onSubmit={onSave}>
      <h2 className='text-xl font-bold'>Personal Details</h2>
      <div className='grid grid-cols-2 mt-5 gap-3'>
        <div>
          <label>First Name</label>
          <Input name="firstName" value={formData.firstName} required onChange={handleChange} />
        </div>
        <div>
          <label>Last Name</label>
          <Input name="lastName" defaultValue={resumeInfo?.lastName } required onChange={handleChange} />
        </div>
      </div>
      <div>
        <label>Email</label>
        <Input name="email" defaultValue={resumeInfo?.email } required onChange={handleChange} />
      </div>
      <div>
        <label>Address</label>
        <Input name="address" defaultValue={resumeInfo?.address }  required onChange={handleChange} />
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <div>
          <label>Cell No</label>
          <Input name="phone" defaultValue={resumeInfo?.phone }  required onChange={handleChange} />
        </div>
        <div>
          <label>Date Of Birth</label>
          <Input type="date" name="dob" defaultValue={resumeInfo?.dob } required onChange={handleChange} />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <div>
          <label>Nationality</label>
          <Input name="nationality" defaultValue={resumeInfo?.nationality } required onChange={handleChange} />
        </div>
        <div>
          <label>Job Title</label>
          <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle }  required onChange={handleChange} />
        </div>
      </div>
      <div className='mt-3 flex justify-end'>
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? <LoaderPinwheelIcon className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </form>
  );
}

export default PersonalDetails;

