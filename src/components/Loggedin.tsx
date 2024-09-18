import { useNavigate } from "react-router-dom"
import AddOrSee from "./AddOrSee"
import SearchBox from "./SearchBox"
import { useState } from "react"
import { IoIosAdd } from "react-icons/io"
import { CiBoxList } from "react-icons/ci"

const Loggedin = () => {
  const [add, setAdd] = useState<boolean>(false)
  const navigate = useNavigate()
  return (
    <>
    <div className="w-full flex flex-col items-center space-y-7 md:space-y-9">
        <div className="z-30 bg-[#f7f7f7] border-2 sticky top-[68px] w-[100%] flex flex-col items-center gap-6 md:gap-9 py-4 md:py-8">
          <div className="border-2 w-[340px] md:w-[400px]"onClick={() => navigate("/search")}>
              <SearchBox />
          </div>
          <div className=" text-sm md:text-lg z-30 flex items-center gap-4 justify-center">
              <div onClick = {() => setAdd(true)} className={`flex items-center border-2 border-b-4 h-[40px] md:h-[50px] w-[130px] md:w-[150px] rounded-xl shadow-md cursor-pointer ${add && "border-b-black bg-gray-200"}`}>
                  <IoIosAdd size = {30}/>
                  <h1>Add an entry</h1>
              </div>
              <div onClick = {() => setAdd(false)} className={`flex items-center border-2 border-b-4 h-[40px] md:h-[50px] w-[140px] md:w-[170px] gap-1 rounded-xl shadow-md cursor-pointer ${!add && "border-b-black bg-gray-200"}`}>
                  <CiBoxList size = {23}/>
                  <h1>Show my entries</h1>
              </div>
          </div>
        </div>
        <AddOrSee add = {add}/>
    </div>
    </>

  )
}

export default Loggedin