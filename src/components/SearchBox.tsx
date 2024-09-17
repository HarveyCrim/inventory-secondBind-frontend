import { FaSearch } from "react-icons/fa";
const SearchBox = () => {
  return (
    <div className="flex cursor-pointer items-center border gap-3 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-black p-3 md:px-4 md:py-4">
            <FaSearch className= "fill-white" size = {20}/>
        </div>
        <input className = "outline-none w-[340px] md:w-[350px] md:text-xl" type = "text" placeholder = "Search the Inventory..." />
    </div>
  )
}

export default SearchBox