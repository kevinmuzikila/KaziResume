import { LoaderPinwheel, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import Global_API from "./../../../service/Global_API";
import { useNavigate, useParams } from "react-router-dom";

function AddResume({ openDialog, setOpenDialog }) {
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const params = useParams();
  const navigate = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const userName = user?.fullName;
    const data = {
      data: {
        title: resumeTitle,
        resumeid: uuid,
        userName: userName,
        userEmail: userEmail,
      },
    };
    Global_API.CreateNewResume(data).then((resp) => {
      if (resp) {
        setLoading(false);
        navigate('/resume/'+resp.data.documentId+"/EditResume");
      }
    }).catch(() => {
      setLoading(false);
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
          <DialogDescription>
            Enter a title for your resume
            <Input
              placeholder="Eg: Java-Engineer Resume"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </DialogDescription>
          <div className="dialog-button flex justify-end gap-3">
            <Button onClick={() => setOpenDialog(false)} variant="ghost">
              Cancel
            </Button>
            <Button disabled={!resumeTitle || loading} onClick={onCreate}>
              {loading ? (
                <LoaderPinwheel className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddResume;
