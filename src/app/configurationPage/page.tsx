import React from 'react'
import ConfigurationPage from '../../components/ConfigurationPage'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const page = () => {
  return (
    <div>
        <Navbar/>
      <ConfigurationPage />
      <Footer/>
    </div>
  )
}

export default page
