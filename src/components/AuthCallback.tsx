import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { getUserFromDb } from "../api/userApi"
import { useNavigate } from "react-router-dom"

const AuthCallback = () => {
  const {user} = useAuth0()
  const navigate = useNavigate()
  const {findingUser, findUser, userData} = getUserFromDb()
  useEffect(() => {
    if(!userData && user){
        findUser({email : user?.email as String, name: user?.name as String})
    }
  }, [user])
  useEffect(() => {
        if(userData){
            return navigate("/")
        }
  }, [findingUser, findUser])
  return (
    <></>
  )
}

export default AuthCallback