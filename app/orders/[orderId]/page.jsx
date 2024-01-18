import OrderPage from '../../../components/Orders/OrderPage'
import { getServerSession } from 'next-auth/next';
import { options } from '../../api/auth/[...nextauth]/options';

const baseURL = process.env.BASE_URL 

const page = async({params}) => {
  const session = await getServerSession(options)
  const user = session?.user;
  return (
    <OrderPage user={user} baseURL={baseURL} orderId={params.orderId}/>
  )
}

export default page