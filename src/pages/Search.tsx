import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Search = () => {
const navigate = useNavigate()
const {isAuthenticated} = useAuth0()
if(!isAuthenticated){
    navigate("/")
}
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Search
