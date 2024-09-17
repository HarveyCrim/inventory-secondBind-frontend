import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { getUserFromDb } from "../api/userApi"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setId } from "../redux/userSlice"

const AuthCallback = () => {
  const {user} = useAuth0()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {findingUser, findUser, userData} = getUserFromDb()
  useEffect(() => {
    if(!userData && user){
        findUser({email : user?.email as String, name: user?.name as String})
    }
  }, [user])
  useEffect(() => {
        if(userData){
            dispatch(setId(userData.id))
            return navigate("/")
        }
  }, [findingUser, findUser])
  return (
    <></>
  )
}

export default AuthCallback