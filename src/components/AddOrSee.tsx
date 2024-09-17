import { IoIosAdd } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import { useState } from "react";
import AddEntryForm from "./AddEntryForm";
const AddOrSee = () => {
  const [add, setAdd] = useState<boolean>(true)
  return (
    <div>
        <div className="flex items-center gap-4 justify-center">
            <div onClick = {() => setAdd(true)} className={`flex items-center border-2 border-b-4 h-[50px] w-[150px] rounded-xl shadow-md cursor-pointer ${add && "border-b-black bg-gray-200"}`}>
                <IoIosAdd size = {30}/>
                <h1>Add an entry</h1>
            </div>
            <div onClick = {() => setAdd(false)} className={`flex items-center border-2 border-b-4 min-h-[50px] w-[158px] gap-1 rounded-xl shadow-md cursor-pointer ${!add && "border-b-black bg-gray-200"}`}>
                <CiBoxList size = {23}/>
                <h1>Show my entries</h1>
            </div>
        </div>
        {add && <div className="mt-10 md:mt-0 flex items-center justify-center"><AddEntryForm /></div>}
    </div>
  )
}

export default AddOrSee