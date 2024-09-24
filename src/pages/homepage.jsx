import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/clerk-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
 
    const jobSites = [
      { name: "LinkedIn", url: "https://www.linkedin.com" },
      { name: "Indeed", url: "https://www.indeed.com" },
      { name: "Glassdoor", url: "https://www.glassdoor.com" },
      { name: "Monster", url: "https://www.monster.com" },
      { name: "SimplyHired", url: "https://www.simplyhired.com" }
    ];
  return (
    <div className="homepage flex flex-col items-center">
      <div className="homepage-top flex justify-between w-full items-center">
        <h2 className="font-bold text-2xl text-teal-700 animate-fade-in">Welcome to Your Resume Builder</h2>
        <div className="profile-pic">
          <UserButton size="sm" />
        </div>
      </div>
    

      <div className="homepage-down mt-5 text-center">
        <h2 className="font-bold text-4xl mb-4 animate-bounce text-indigo-800">Create Your Perfect Resume Effortlessly</h2>
        <p className="text-xl mb-6 text-gray-200">
          Use our intuitive platform to design a professional resume in minutes.
        </p>

        <div className="feature-sec grid grid-cols-1 sm:grid-cols-3 gap-10 p-10">
          <div className="feature-card bg-white shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 animate-slide-up">
            <img src="https://via.placeholder.com/150" alt="Resume Builder" className="mb-4" />
            <h3 className="font-bold text-xl mb-2 text-indigo-700">Intuitive Resume Builder</h3>
            <p className='text-black '>Easy-to-use tools to design a resume that stands out.</p>
          </div>
          <div className="feature-card bg-white shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 animate-slide-up delay-150">
            <img src="https://via.placeholder.com/150" alt="Template Library" className="mb-4" />
            <h3 className="font-bold text-xl mb-2 text-indigo-600">Diverse Template Library</h3>
            <p className='text-black '>Choose from a wide range of professional templates.</p>
          </div>
          <div className="feature-card bg-white shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 animate-slide-up delay-300">
            <img src="https://via.placeholder.com/150" alt="AI Assistance" className="mb-4" />
            <h3 className="font-bold text-xl mb-2 text-indigo-500">AI-Assisted Writing</h3>
            <p className='text-black '>Get AI suggestions to optimize your experience descriptions.</p>
          </div>
        </div>

        <div className="mt-10">
            <Link to={'/dashboard'}> 
          <Button className="animate-pulse bg-gradient-to-r from-teal-500 to-blue-600 text-white px-5 py-3 rounded-lg shadow-lg">
            Create New Resume
          </Button>
          </Link>
        </div>

        {/* Job Posting Section */}
        <div className='job-sites-section mt-10'>
          <h2 className='font-bold text-2xl text-center text-teal-400 mb-5'>Explore Job Opportunities</h2>
          <div className='job-sites grid grid-cols-5 gap-6'>
            {jobSites.map((site, index) => (
              <a href={site.url} target='_blank' rel='noopener noreferrer' key={index} className='job-site-card p-4 border rounded shadow-md text-center hover:shadow-lg'>
                <h3 className='font-bold text-teal-700'>{site.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
