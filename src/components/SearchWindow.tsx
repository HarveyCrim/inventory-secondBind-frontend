import { useEffect, useRef, useState } from 'react'
import {  dataForCsv, filterBooksApi, filterBooksCountApi } from '../api/bookApi'
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
import papa from "papaparse"


type inventoryField = Omit<bookField, "date"> & {userId: number, publication_date: Date, entryId: number}
const SearchWindow = ({query} : {query: (filterField & {genres: String[]})| undefined}) => {
  const {filterBooks, filteredBooks, filteringBooks} = filterBooksApi()
  const [csvData, setCSVData] = useState<any>(null)
  const [csvLoading, setCSVLoading] = useState<number>(0)
  const dispatch = useDispatch()
  const filterOn = useSelector<IRootState, boolean>(state => state.userReducer.filter)
  const {filteredBooksCount, getfilterBooksCount, gettingfilterBooksCount} = filterBooksCountApi()
  const pageRef = useRef<number>(0)
  const atStart = async () => {
    await getfilterBooksCount({info: query!})
    await filterBooks({info:query!, page:pageRef.current})
    setCSVData(null)
  }
  const downloadCSV = () => {
    if(!query){
        return
    }
    const csv = papa.unparse(csvData!);

    const csvBlob = new Blob([csv], { type: "text/csv" });

    const csvUrl = URL.createObjectURL(csvBlob);

    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "inventory_data.csv";

    link.click();

    URL.revokeObjectURL(csvUrl);
  }

  const findCSVData = async () => {
    if(!query){
        return
    }
   setCSVLoading(1)
   const data =  await dataForCsv({info:query!})
   setCSVData(data)
   setCSVLoading(0)
  }

  const prevButton = () => {
    if(pageRef.current == 0)
        return
    pageRef.current--
    filterBooks({info:query!, page:pageRef.current})
  }

  const nextButton = () => {
    if(13 * pageRef.current + 13 >= filteredBooksCount){
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
    return (<div className={`bg-white border-4 flex w-full h-[92.2vh] justify-center items-center border`}><SpinnerCircular color='#ffffff'/></div>)
  }
  return (
    <div className={`w-[100%] min-h-[88.2vh] md:min-h-[92.2vh] border bg-white border`}>
        <div className={`flex items-center ${!filterOn ? "z-20" : "z-0"} justify-between bg-white px-3 sticky top-[68px] md:top-[70px] py-1 border`}>
            <Link className="md:hidden" to = "/"><div className='flex gap-1 items-center'><IoMdArrowRoundBack size = {20}/><span className=''>Back</span></div></Link>
            <div onClick = {() => dispatch(setFilter(true))} className={`md:hidden bg-gray-400 border-black text-black shadow-lg flex items-center p-2 gap-1 rounded-xl w-fit`}><span>Filters</span><FaFilter /></div>
        </div>
        {filteredBooks && filteredBooks.length > 0 && <div className='flex flex-col items-center py-3'>
            <div className='flex justify-between border px-5 w-full md:px-9 py-1 items-center'>
                <p className="text-center font-bold text-xs md:text-md py-1">{`Showing ${(pageRef.current * 13) + 1} - ${(pageRef.current * 13) + 13 <= filteredBooksCount ? (pageRef.current * 13) + 13 : filteredBooksCount} of ${filteredBooksCount} results.`}</p>
                {csvData == null && csvLoading == 0 && <button className="bg-black text-white h-[30px] md:h-[50px] w-[100px] text-sm md:w-[200px]"onClick={() => findCSVData()}>Export CSV</button>}
                {csvLoading == 1 && <button className="bg-black text-white h-[30px] md:h-[50px] w-[100px] text-sm md:w-[200px]"><div className='w-full flex justify-center items-center'><SpinnerCircular size={30} color='#ffffff'/></div></button>}
                {csvData != null && <button className="bg-black text-white h-[30px] md:h-[50px] w-[100px] text-sm md:w-[200px]" onClick={downloadCSV}>Download CSV</button>}
            </div>
            {
                filteredBooks?.map((item: inventoryField) => {
                    return <InventoryCard key = {item.entryId} entryId = {item.entryId} title = {item.title} userId={item.userId} author={item.author} date={item.publication_date} genre={item.genre} isbn={item.isbn}/>
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
            <p className='font-medium text-lg mt-[50px]'>Begin a search.</p>
        </div>
        }
        {filteredBooks?.length == 0 && <div className='flex justify-center items-center h-full'>
            <p className='font-medium text-lg mt-[100px]'>No results found. Change the filters.</p>
        </div>
        }
    </div>
  )
}

export default SearchWindow