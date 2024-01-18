import HistorPage from '../../components/Orders/HistorPage'
import { getServerSession } from 'next-auth/next';
import { options } from '../api/auth/[...nextauth]/options';

const baseURL = process.env.BASE_URL 

const page = async() => {
  const session = await getServerSession(options)
  const user = session?.user;
  return (
    <HistorPage user={user} baseURL={baseURL}/>
  )
}

export default page

