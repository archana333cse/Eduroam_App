import HomePage from '@/components/Homepage'
import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div>
        <Navbar/>
      <HomePage/>
      <Footer/>
    </div>
  )
}

export default page
