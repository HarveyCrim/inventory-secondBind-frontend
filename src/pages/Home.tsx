import { useAuth0 } from "@auth0/auth0-react"
import Navbar from "../components/Navbar"
import NotLoggedIn from "../components/NotLoggedIn"
import Loggedin from "../components/Loggedin"

const Home = () => {
  const {isAuthenticated, isLoading} = useAuth0()
  return (
    <div className="min-h-[100vh] md:h-[100vh] bg-[#f7f7f7] border-4 flex flex-col">
        <Navbar />
        {!isLoading && !isAuthenticated && <div className="flex items-center h-[100%]"><NotLoggedIn /></div>}
        {!isLoading && isAuthenticated && <div className="flex flex-col items-center h-[100%]"><Loggedin /></div>}
    </div>
  )
}

export default Home