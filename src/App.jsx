import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "./components/ui/button"
import { Input } from './components/ui/input'
import { Checkbox } from "./components/ui/checkbox"
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './section/header'
import { Toaster } from './components/ui/sonner'




function App() {
  const {user, isLoaded, isSignedIn}= useUser();

  if(!isSignedIn&&isLoaded){
    return <Navigate to={'auth/sign-in'}/>
  }

  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Outlet/>
    <Toaster />
    <Toaster />
    </>
  )
}

export default App
