import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const {loginWithRedirect, isAuthenticated, logout, user, isLoading} = useAuth0()
  console.log(isAuthenticated)
  const logoutFunc = () => {
    localStorage.removeItem("token")
    logout()
  }
  if(isLoading){
    return <></>
  }
  return (
    <div className = "z-30 sticky top-0 bg-black flex items-center justify-between py-5 px-5 md:px-10 ">
        <Link to = {import.meta.env.VITE_FRONTEND_URL}><h1 className="tracking-tight text-white cursor-pointer text-xl md:text-3xl font-medium">Inventory System</h1></Link>
        {!isAuthenticated && <h4 onClick = {() => loginWithRedirect()} className=" text-sm md:text-xl cursor-pointer hover:border-slate-500 text-slate-500 rounded-full border-2 border-slate-300 shadow-lg px-4 py-1 text-white">Login</h4>}
        {isAuthenticated && <div className="flex items-center gap-1"><span onClick = {logoutFunc} className=" text-sm md:text-xl cursor-pointer hover:border-slate-500 text-slate-500 text-white underline">Logout</span><span className="text-xs text-white">{"("+user?.name+")"}</span></div>}
    </div>
  )
}

export default Navbar