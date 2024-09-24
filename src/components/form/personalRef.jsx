import React, { useContext, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import InfoContext from '@/assets/infoContext';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../ui/button';
import { ArrowBigDownDashIcon, LoaderPinwheelIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Global_API from './../../../service/Global_API';
import { toast } from 'sonner';

const formField = {
  name: "",
  company: "",
  role: "",
  contact: "",
};

function PersonalRef({enableNext}) {
  const [refList, setRefList] = useState([formField])
  const [loading, setLoading] = useState(false);
const { resumeInfo, setResumeInfo } = useContext(InfoContext);
const params = useParams();


useEffect (() => {
  resumeInfo && setRefList(resumeInfo?.reference)
 
 }, []);

  useEffect (() => {
    setResumeInfo({
      ...resumeInfo,
          reference: refList
        })

  }, [refList])

  const handleChange = (index,event) => {
    enableNext(false)
const newEntries = refList.slice();
    const {name,value} = event.target;
    newEntries[index][name] = value;
    setRefList(newEntries);
  }

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        reference: refList
      }
    };

    console.log('data', data)
    
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
  }

  const addNew = () => {
    setRefList([...refList, formField]);
  };

  const deleteExp = () => {
    setRefList(refList=>refList.slice(0, -1));
  };

  return (
    <div className="Exp-prev">
    <h2 className="text-xl font-bold">Reference</h2>
    <div className="for-overflow">
    <form className="Exp-prev h-full" >
    {refList.map((item, index) => (
        <div key={index} className="cont-exp-form mt-5">
           <div>
              <label>Full Name </label>
              <Input name="name"value={item.name}  onChange={(event) => handleChange(index, event)} />
            </div>
            <div className="grid grid-cols-2 mt-5 gap-3">
              <div>
                <label>Comapny</label>
                <Input name="company" value={item.company} required onChange={(event) => handleChange(index, event,)} />
              </div>
              <div>
                <label>Role</label>
                <Input name="role" required  value={item.role} onChange={(event) => handleChange(index, event)} />
              </div>
              <div>
              <label>Conatcts </label>
              <Input name="contact" value={item.contact} onChange={(event) => handleChange(index, event)} />
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

export default PersonalRef