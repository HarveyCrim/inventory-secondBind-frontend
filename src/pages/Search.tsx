import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
const navigate = useNavigate()
const {isAuthenticated} = useAuth0()
if(!isAuthenticated){
    navigate("/")
}
  return (
    <div>Search</div>
  )
}

export default Search
