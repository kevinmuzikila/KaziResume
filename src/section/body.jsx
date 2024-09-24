import { Button } from '@/components/ui/button'
import React from 'react'

function BodyLanding() {
  return (
    <div className='landingPage'>
<div className='home-content'>
  <img src='illu1 (1).png' className='illustate z-0 drop-shadow animate-pulse' alt='web.png'/>
<h1 className='text-5xl font-bold z-10 '> Welcome to Kazi_Profile </h1>
<h2 className='text-2xl z-10 '>Create innovative, stylish, and profesional resumes</h2>
<h3 className='text-xl z-10'>with intergrated and responsive AI </h3>
<img src='illu1.png' className='illustate2 z-0 drop-shadow animate-pulse ' alt='web.png'/>
<div className="home-button flex gap-2 mt-6">
<Button variant="orange">Browse Templates </Button> 
</div>
</div>
    </div>
  )
}

export default BodyLanding