import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '../ui/button';
import { LoaderPinwheelIcon, Minus, PlusIcon } from 'lucide-react';
import InfoContext from '@/assets/infoContext';
import Global_API from "./../../../service/Global_API";
import { useParams } from 'react-router-dom';
import { toast } from "sonner"

function PersonalLanguage({enableNext}) {
  const [langList,setLangList ] = useState([{name:'',rating:0}]);
  const { resumeInfo, setResumeInfo } = useContext(InfoContext); 
  const [loading, setLoading] = useState(false);
  const params = useParams();
  
  useEffect (() => {
    resumeInfo && setLangList(resumeInfo?.language)
   }, []);

  useEffect (()=> {
      console.log()
      setResumeInfo({
        ...resumeInfo,
        language:langList
      })

  } ,[langList])

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
  
    const data = {
      data:{
      language:langList
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
    const newEntries = langList.slice();
    newEntries[index][name] = value;
    setLangList(newEntries);
  }
  const addNew = () => {
      setLangList([...langList,{name:'',rating:0}])
  }
  const deleteSkill = () => 
  {
      setLangList(langList=>langList.slice(0,-1))
  }

  return (
    <div className="Exp-prev">
    <h2 className="text-xl font-bold">Language </h2>
    <div className='mb-3 skills-cont'>
    {langList.map((item, index)=>
       <div className='skill-box flex justify-between items-center mt-3 '>
           <div className=''>
         
           <Input name="name" value={item.name} placeholder="Enter language" required onChange={(e) => handleChange(index,'name', e.target.value)} />
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

    <Button size="sm" variant='add' className="ms-3" onClick={addNew} ><PlusIcon/> </Button>
    </div>
    <Button type="submit" size="sm" disabled={loading} onClick={onSave}>
            {loading? <LoaderPinwheelIcon className="animate-spin" /> : "Save"}
            
          </Button>
    </div>
    </div>

  )
}

export default PersonalLanguage;