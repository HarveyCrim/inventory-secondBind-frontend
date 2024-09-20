import { useAuth0 } from "@auth0/auth0-react"

const NotLoggedIn = () => {
  const {loginWithRedirect} = useAuth0()
  return (
    <div className="flex flex-col-reverse md:flex-row md:items-center p-4 md:p-10">
        <div className="md:w-[45%] space-y-2 md:space-y-10">
          <h1 className="text-5xl md:text-6xl font-medium">Tired of trying to remember all your book details.</h1>
          <h4 className="text-2xl text-gray-600 pb-1 md:pb-0">Leave it all to Inventory System. A simple to use tool.</h4>
          <div>
            <span className="text-gray-400">Add all your book details here and give your memory a rest. </span>
            <span onClick = {() => loginWithRedirect()} className="text-gray-500 cursor-pointer underline">Sign up.</span>
          </div>
        </div>
        <img className = {"md:w-[55%] h-[350px] md:h-[600px]"} src = "https://clipground.com/images/4-stacked-books-clipart-5.png" alt = "" />
    </div>
  )
}

export default NotLoggedIn