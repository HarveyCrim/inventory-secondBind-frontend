import { useEffect, useRef } from 'react'
import { filterBooksApi, filterBooksCountApi } from '../api/bookApi'
import { bookField, filterField } from '../zod/schemas'
import { SpinnerCircular } from 'spinners-react'
import InventoryCard from './InventoryCard'
import { FaFilter } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../redux/userSlice'
import { IRootState } from '../redux/store'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom'
type inventoryField = Omit<bookField, "date"> & {userId: number, date: Date, entryId: number}
const SearchWindow = ({query} : {query: (filterField & {genres: String[]})| undefined}) => {
  const {filterBooks, filteredBooks, filteringBooks} = filterBooksApi()
  const dispatch = useDispatch()
  const filterOn = useSelector<IRootState, boolean>(state => state.userReducer.filter)
  const {filteredBooksCount, getfilterBooksCount, gettingfilterBooksCount} = filterBooksCountApi()
  const pageRef = useRef<number>(0)
  console.log(filteredBooks)

  const atStart = async () => {
    await getfilterBooksCount({info: query!})
    await filterBooks({info:query!, page:pageRef.current})
  }

  const prevButton = () => {
    if(pageRef.current == 0)
        return
    pageRef.current--
    filterBooks({info:query!, page:pageRef.current})
  }

  const nextButton = () => {
    if(13 * pageRef.current >= filteredBooksCount){
        return
    }
    pageRef.current++
    filterBooks({info:query!, page:pageRef.current})
  }

  useEffect(() => {
    pageRef.current = 0
    if(query)
        atStart()
  }, [query])
  if(filteringBooks || gettingfilterBooksCount){
    return (<div className={`bg-white border-4 flex w-full h-[88.2vh] justify-center items-center border`}><SpinnerCircular color='#ffffff'/></div>)
  }
  return (
    <div className={`w-[100%] min-h-[88.2vh] border bg-white border`}>
        <div className={`flex items-center ${!filterOn ? "z-20" : "z-0"} justify-between bg-white px-3 sticky top-[68px] py-1 border`}>
            <Link to = "/"><div className='flex gap-1 items-center'><IoMdArrowRoundBack size = {20}/><span>Back</span></div></Link>
            <div onClick = {() => dispatch(setFilter(true))} className={`md:hidden bg-gray-400 border-black text-black shadow-lg flex items-center p-2 gap-1 rounded-xl w-fit`}><span>Filters</span><FaFilter /></div>
        </div>
        {filteredBooks && filteredBooks.length > 0 && <div className='flex flex-col items-center py-3'>
            <p className="text-center font-bold text-sm md:text-md py-1">{`Showing ${(pageRef.current * 13) + 1} - ${(pageRef.current * 13) + 13 <= filteredBooksCount ? (pageRef.current * 13) + 13 : filteredBooksCount} of ${filteredBooksCount} results.`}</p>
            {
                filteredBooks?.map((item: inventoryField) => {
                    return <InventoryCard key = {item.entryId} entryId = {item.entryId} title = {item.title} userId={item.userId} author={item.author} date={item.date} genre={item.genre} isbn={item.isbn}/>
                })
            }
            <div className="flex mt-2 justify-center gap-4">
                <div onClick = {() => prevButton()} className={`gap-1 text-lg flex ${pageRef.current != 0 && "cursor-pointer bg-gray-800 text-white hover:bg-black"} ${pageRef.current == 0 && "bg-gray-300 text-gray-400"} border-2 items-center justify-center py-1 w-[140px]`}>
                    <FaArrowLeft />
                    <span>Previous</span>
                </div>
                <div onClick = {() => nextButton()} className={`flex text-lg gap-1 ${(pageRef.current * 13) + 13 < filteredBooksCount && "cursor-pointer bg-gray-800 text-white hover:bg-black"} ${(pageRef.current * 13) + 13 >= filteredBooksCount && "bg-gray-300 text-gray-400"} gap-1 items-center py-1 justify-center w-[140px] border-2`}>
                    <span>Next</span>
                    <FaArrowRight />
                </div>
            </div>
        </div>}
        {!filteredBooks&& <div className='flex justify-center items-center h-full'>
            <p className='font-medium text-lg'>Begin a search.</p>
        </div>
        }
        {filteredBooks?.length == 0 && <div className='flex justify-center items-center h-full'>
            <p className='font-medium text-lg'>No results found. Change the filters.</p>
        </div>
        }
    </div>
  )
}

export default SearchWindow