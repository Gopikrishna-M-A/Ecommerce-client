import React from 'react'
import ProductListing from '../../../components/Home/ProductListing'
import { getServerSession } from 'next-auth/next';
import { options } from '../../api/auth/[...nextauth]/options';
const baseURL = process.env.BASE_URL 


const page = async({params}) => {
  const session = await getServerSession(options)
  const user = session?.user;
  return (
    <ProductListing params={params} baseURL={baseURL} user={user}/>
  )
}

export default page