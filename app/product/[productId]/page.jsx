import React from 'react'
import ProductDetail from '../../../components/ProductDetail'
import { getServerSession } from 'next-auth/next';
import { options } from '../../api/auth/[...nextauth]/options';
const baseURL = process.env.BASE_URL 


const page = async({ params }) => {
  const productId = params.productId;
  const session = await getServerSession(options)
  const user = session?.user;
  return (
   <ProductDetail baseURL={baseURL} user={user} productId={productId}/>
  )
}

export default page