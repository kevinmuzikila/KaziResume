import React, { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import AddResume from '@/components/ui/addResume';
import Global_API from './../../service/Global_API';
import ResumeCard from '@/components/resumeCard';
import { Button } from '@/components/ui/button';
import { ArrowBigLeft, House } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (user) {
      GetResumeList();
    }
  }, [user]);

  const GetResumeList = () => {
    Global_API.GetResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        setResumeList(resp.data);
        setLoading(false)
      })
  };
 
  return (
    <div className="dashboard-container">
      <div className="dashboard-header flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="home-icon">
            <House size={30} />
          </Link>
          <h3 className="text-3xl font-bold">Dashboard</h3>
        </div>
        <UserButton className="profile-pic" />
      </div>
      

      <div className="dashboard-hero">
        <h1 className="text-4xl font-bold">Manage Your Resumes Effortlessly</h1>
        <p className="mt-2 text-lg">Create, Edit, or View your resumes, with AI ready to assist you every step of the way.</p>
                {/* Start Building Button */}
                <Button onClick={() => setOpenDialog(true)} size="lg" className='mt-5'>
            Start Building
          </Button>
      </div>

      <div className="dashboard-body">
        <div className="my-resumes-header flex justify-between items-center">
          
          
        </div>
        <h2 className="text-2xl font-bold">My Resumes</h2>
        <div className="resume-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {resumeList.map((resume, index) => (
            <ResumeCard resume={resume} key={index} refreshData={GetResumeList}/>
          ))}
         
        {loading? <div className='w-screen flex justify-center align-center'><div className='loader '> </div>  </div> : '' }
      
        </div>
      </div>
      {openDialog && (
        <AddResume openDialog={openDialog} setOpenDialog={setOpenDialog} />
      )}
    </div>
  );
}

export default Dashboard;
