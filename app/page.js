import React from 'react'
import Home from '../components/Home/Home'

const baseURL = process.env.BASE_URL 

const page = () => {
  return (
    <Home baseURL={baseURL}/>
  )
}

export default page