import { useNavigate } from "react-router-dom"
import AddOrSee from "./AddOrSee"
import SearchBox from "./SearchBox"

const Loggedin = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex flex-col items-center space-y-7 md:space-y-14 mt-14">
        <div className="w-[340px] md:w-[400px]"onClick={() => navigate("/search")}>
            <SearchBox />
        </div>
        <AddOrSee />
    </div>

  )
}

export default Loggedin