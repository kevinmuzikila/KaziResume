import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '../ui/button';
import { toast } from "sonner"
import { LoaderPinwheelIcon, Minus, PlusIcon } from 'lucide-react';
import InfoContext from '@/assets/infoContext';
import Global_API from "./../../../service/Global_API";
import { useParams } from 'react-router-dom';



function PersonalSkills({enableNext}) {
  const [skillsList,setSkillsList ] = useState([{name:'',rating:0}]);
  const { resumeInfo, setResumeInfo } = useContext(InfoContext); 
  const [loading, setLoading] = useState(false);
  const params = useParams();
  
  useEffect (() => {
    resumeInfo && setSkillsList(resumeInfo?.skills)
   }, []);

  useEffect (()=> {
      console.log()
      setResumeInfo({
        ...resumeInfo,
        skills:skillsList
      })

  } ,[skillsList])

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
  
    const data = {
      data:{
        skills: skillsList
      }
    }
    console.log(data);
  
    Global_API.UpdateResume(params.resumeid,data).then(resp=>{
      console.log(resp);
      setLoading(false);
      toast('Update SucessFul  ')
      enableNext(true)
    })  .catch((error) => {
      console.error('Api put failed', error);
      setLoading(false);
      toast("Error in updating resume");
    });
      
  };
  
  const handleChange = (index,name,value) => {
    enableNext(true)
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  }
  const addNew = () => {
      setSkillsList([...skillsList,{name:'',rating:0}])
  }
  const deleteSkill = () => 
  {
      setSkillsList(skillsList=>skillsList.slice(0,-1))
  }

  return (
    <div className="Exp-prev">
    <h2 className="text-xl font-bold">Add Skills</h2>
    <div className='mb-3 skills-cont'>
    {skillsList.map((item, index)=>
       <div className='skill-box flex justify-between items-center mt-3 '>
           <div className=''>
         
           <Input name="name" placeholder="Skills"  value={item.name} required onChange={(e) => handleChange(index,'name', e.target.value)} />
      </div>
      <div>
    < Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v) => handleChange(index,'rating', v)} />
      </div>
       </div>
    )}
    </div>
    <div className="none flex justify-between">
    <div>
    <Button variant="destructive" size="sm" onClick={deleteSkill} > <Minus/> </Button>

    <Button variant="add" size="sm" className="ms-3" onClick={addNew} ><PlusIcon/> </Button>
    </div>
    <Button type="submit" size="sm" disabled={loading} onClick={onSave}>
            {loading? <LoaderPinwheelIcon className="animate-spin" /> : "Save"}
            
          </Button>
    </div>

    </div>

  )
}

export default PersonalSkills