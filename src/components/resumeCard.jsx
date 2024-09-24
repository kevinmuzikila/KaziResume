import { MoreVertical, NotebookPenIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Global_API from './../../service/Global_API';
import { toast } from 'sonner';



function ResumeCard({resume, refreshData}) {
  console.log('Resume data:', resume);
  const navigate = useNavigate();
  const {resumeID} = useParams();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading ] = useState(false);

  const handleDelete = () => {
    setLoading(true)
    Global_API.DeleteResume(resume.documentId).then(resp=>{console.log(resp)
      toast('Resume Deleted ')
      refreshData();
      setLoading(false)
      setOpenAlert(false)
    })
  }

  const navigateClick = () => {

  }
  return (
    <div className=''>
     

       
        <div className='' >
          <DropdownMenu>
  <DropdownMenuTrigger><MoreVertical className='curssor-pointer '> </MoreVertical></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel onClick={()=>{navigate('/resume/'+resume.documentId+"/EditResume")}}>Edit</DropdownMenuLabel>
    <DropdownMenuItem onClick={()=>{navigate('/viewResume/'+resume.documentId+"/view")}}>Download </DropdownMenuItem>
    <DropdownMenuItem onClick={()=>{navigate('/resume/'+resume.documentId+"/EditResume")}}>Share </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=>{setOpenAlert(true)}}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
          </div>
          <Link to={'/resume/'+resume.documentId+"/EditResume"}>
        <div className="resume-disp">
        
        <p> </p>
        <NotebookPenIcon/>
        <h2 className='font-bold ms-1 '>{resume.title}</h2>
        </div>
       
        </Link>
        <AlertDialog open={openAlert}>
  
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your Resume
        and remove your data from our Database.
        
         <div className='border-2 w-full flex justify-center align-center'>
        {loading? <div className='loader '> </div> : '' }
        </div>
       
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>{setOpenAlert(false)}}>  Cancel</AlertDialogCancel>
      <AlertDialogAction disabled={loading} onClick={handleDelete}>Delete </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

   
    </div>
  )
}

export default ResumeCard;