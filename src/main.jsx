import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Mainpage from './pages/mainpage.jsx'
import Dashboard from './pages/dashboard.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './pages/resume/[resumeid]/EditResume.jsx'
import Homepage from './pages/homepage.jsx'
import AddResume from './components/ui/addResume.jsx'
import ViewResume from './pages/viewResume/[resumeID]/view.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  { 
    element:<App/>,
    children:[
    {
    path: "/dashboard",
    element: <Dashboard/>
    },
    {
      path: '/resume/:resumeid/EditResume',
      element: <EditResume/>
      },
      {
        path: '/homepage',
        element: <Homepage />
        },
        {
          path: '/addResume',
          element: <AddResume />
          },
          {
            path: '/viewResume/:resumeID/view',
            element: <ViewResume/>
            }
  ]
  },
  {
    path:'/',
  element: <Mainpage/>
  },
  {
    path: '/viewResume/:resumeID/view',
    element: <ViewResume/>
    },
  
  {path:'/auth/sign-in',
    element: <SignInPage/>
  }

  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" afterSignInUrl='/homepage'>
    <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
