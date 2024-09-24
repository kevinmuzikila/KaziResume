// 
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner"

import RichTextEditor from "../ui/richTextEditor";
import InfoContext from "@/assets/infoContext";
import { AIChatSession } from "./../../../service/AIModel";
import { LoaderPinwheelIcon } from "lucide-react";
import Result from "postcss/lib/result";
import { useParams } from "react-router-dom";
import Global_API from "./../../../service/Global_API";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};
function PersonalExp({enableNext}) {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(InfoContext);
  const [expList, setExpList] = useState([formField]);
  const params = useParams();

   useEffect (() => {
    resumeInfo && setExpList(resumeInfo?.experience)
   }, []);

    
  const handleChange = (index, event) => {
    enableNext(false)
    const newEntries = expList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExpList(newEntries);

    if (name === 'startDate' || name === 'endDate') {
      newEntries[index][name] = formatDate(value); // Format the date before setting it
    } else {
      newEntries[index][name] = value;
    }
  };

  const handleTextEditor = (index, event, name) => {
    const newEntries = expList.slice();
    newEntries[index][name] = event.target.value;
    setExpList(newEntries);
  };

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    const options = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options).replace(' ', '-');
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        experience: expList
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
  };

  const addNew = () => {
    setExpList([...expList, { ...formField }]);
  };

  const deleteExp = () => {
    setExpList(expList => expList.slice(0, -1));
  };

  // useEffect(() => {
  //   // Only set expList once when the component is first mounted or when resumeInfo changes significantly.
  //   if (resumeInfo?.experience) {
  //     setExpList(resumeInfo.experience);
  //   }
  // }, [resumeInfo]);
  
  useEffect(() => {
      setResumeInfo({
        ...resumeInfo,
        experience: expList,
      });
    }, [expList])
  
  return (
    <div className="Exp-prev">
      <h2 className="text-xl font-bold">Experience</h2>
      <div className="for-overflow">
      <form className="all-form h-full" onSubmit={onSave}>
        {expList.map((item, index) => (
          <div key={index} className="cont-exp-form mt-5">
            <div>
              <label>Job Title/Position</label>
              <Input
                name="title"
                value={item.title}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="grid grid-cols-2 mt-5 gap-3">
              <div>
                <label>Company Name</label>
                <Input
                  name="companyName"
                  value={item.companyName }
                  required
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label>City,Province</label>
                <Input
                  name="city"
                  required
                  value={item.city}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 mt-5 mb-3 gap-3">
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  required
                  value={item.startDate}
                  
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  required
                  value={item.endDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </div>
            <div>
              <RichTextEditor
               defaultValue={item?.workSummary}
                index={index}
                onRichEditChange={(event) => handleTextEditor(index, event, 'workSummary')}
              />
            </div>
          </div>
        ))}
       
      </form>
      </div>
      <div className="mt-3 flex justify-between">
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
          <Button type="submit" onClick={onSave} size="sm" disabled={loading}>
            {loading ? <LoaderPinwheelIcon className="animate-spin" /> : "Save"}
          </Button>
        </div>
    </div>
  );
}

export default PersonalExp;
