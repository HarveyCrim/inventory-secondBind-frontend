import { useEffect, useRef } from "react"
import { getMyBooksApi, getMyBooksCountApi } from "../api/bookApi"
import { SpinnerCircular } from "spinners-react"
import { bookField } from "../zod/schemas"
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import InventoryCard from "./InventoryCard"
type inventoryField = Omit<bookField, "date"> & {userId: number, date: Date, entryId: number}
const ShowEntries = () => {
  const pageRef = useRef<number>(0)
  const {fetchMyBooks, fetchedMyBooks, fetchingMyBooks} = getMyBooksApi()
  const {getBookCount, gettingBookCount, bookCount} = getMyBooksCountApi()
  const atStart = async () => {
    await getBookCount()
    await fetchMyBooks(pageRef.current)
  }
  const nextButton = () => {
    if(12 * pageRef.current >= bookCount){
        return
    }
    pageRef.current++
    fetchMyBooks(pageRef.current)
  }
  const prevButton = () => {
    if(pageRef.current == 0){
        return
    }
    pageRef.current--
    fetchMyBooks(pageRef.current)
  } 

  useEffect(() => {
    atStart()
  },[])

  if(fetchingMyBooks || gettingBookCount){
    return <SpinnerCircular color="#ffffff"/>
  }
  return (
    <div className="z-10 w-full flex flex-col py-2">
        <p className="text-center font-bold text-sm md:text-xl py-1">{`Showing ${(pageRef.current * 12) + 1} - ${(pageRef.current * 12) + 12 <= bookCount ? (pageRef.current * 12) + 12 : bookCount} of ${bookCount} results.`}</p>
        <div className="flex flex-col items-center ">
            {
                fetchedMyBooks?.map((item:inventoryField) => {
                    return <InventoryCard entryId = {item.entryId} title = {item.title} userId={item.userId} author={item.author} date={item.date} genre={item.genre} isbn={item.isbn}/>
                })
            }
        </div>
        <div className="flex mt-2 justify-center gap-4">
            <div onClick = {() => prevButton()} className={`gap-1 text-lg flex ${pageRef.current != 0 && "cursor-pointer bg-gray-800 text-white hover:bg-black"} ${pageRef.current == 0 && "bg-gray-300 text-gray-400"} border-2 items-center justify-center py-1 w-[140px]`}>
                <FaArrowLeft />
                <span>Previous</span>
            </div>
            <div onClick = {() => nextButton()} className={`flex text-lg gap-1 ${(pageRef.current * 12) + 12 < bookCount && "cursor-pointer bg-gray-800 text-white hover:bg-black"} ${(pageRef.current * 12) + 12 >= bookCount && "bg-gray-300 text-gray-400"} gap-1 items-center py-1 justify-center w-[140px] border-2`}>
                <span>Next</span>
                <FaArrowRight />
            </div>
        </div>
    </div>
  )
}

export default ShowEntries