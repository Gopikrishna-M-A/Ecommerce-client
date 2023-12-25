import React from 'react'
import CartClient from '../../components/Cart/CartClient'
import { getServerSession } from 'next-auth/next';
import { options } from '../api/auth/[...nextauth]/options';
const baseURL = process.env.BASE_URL 
const razorpayKEY = process.env.RAZORPAY_KEY

const page = async() => {
  const session = await getServerSession(options)
  const user = session?.user;
  return (
    <CartClient user={user} baseURL={baseURL} razorpayKEY={razorpayKEY}/>
  )
}

export default page