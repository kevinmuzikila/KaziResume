import React from 'react'
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';

function Header() {
    const {user, isSignedIn} = useUser();

  return (
    <div id='no-print' className='Navbar'>
      <Link to={'/homepage'}>
      <img className='h-10 w-50 ms-3' sizes='sm' src="logo-no-background.png" alt="logo.png" />
      </Link>
      
    
    {isSignedIn ?
    <div className="flex ">
         <Link to={'/dashboard'}>
        <Button className='me-3'> Dashboard </Button>
      
        </Link>
    </div>:
        <Link to={'/auth/sign-in'}>
        <Button> Get Started </Button>
        </Link>
    }
   
    </div>
  )
}

export default Header;