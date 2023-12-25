import { getServerSession } from 'next-auth/next';
import { options } from '../../app/api/auth/[...nextauth]/options';
import Nav from './Nav';


const baseURL = process.env.BASE_URL
const Navbar = async() => {
  const session = await getServerSession(options)
  const user = session?.user;
  return (
    <Nav user={user} baseURL={baseURL} />
  )
}

export default Navbar