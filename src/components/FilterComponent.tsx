import { useState } from "react"
import GenreFilter from "./GenreFilter"
import { SubmitHandler, useForm } from "react-hook-form"
import { filterField, filterSchema } from "../zod/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { IoIosSearch } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { IRootState } from "../redux/store"
import { IoMdCloseCircle } from "react-icons/io";
import { setFilter } from "../redux/userSlice"
type filterWithGenre = filterField & {genres: String[]}
const FilterComponent = ({filterFunc, loadedGenres}: {loadedGenres: string[], filterFunc: React.Dispatch<React.SetStateAction<filterWithGenre | undefined>>}) => {
  const [selectedGenres, setSelectedGenres] = useState<String[]>([])
  const dispatch = useDispatch()
  const filterOn = useSelector<IRootState, boolean>(state => state.userReducer.filter)
  const {register, handleSubmit, formState: {errors}} = useForm<filterField>({
    resolver: zodResolver(filterSchema)
  })
  const onSubmit:SubmitHandler<filterField> = (data: filterField) => {
    filterFunc({...data, genres: selectedGenres})
    dispatch(setFilter(false))
  }
  return (
    <div className={`bg-white p-7 md:sticky fixed top-[50px] md:top-[83px] space-y-4 mt-2 md:w-[700px] h-[100%] w-[100%]`}>
        <div className="flex justify-between items-center">
            <span className=" py-1 px-2 text-2xl font-medium text-white bg-gray-500">Filters</span>
            <IoMdCloseCircle onClick = {() => dispatch(setFilter(false))} size = {35} className="md:hidden"/>
        </div>
        <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
                <label className="font-bold md:text-xl text-md">Title</label>
                <input {...register("title")} className= "outline-none border border-black p-1" placeholder= "Enter words in title..." type = "text" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="font-bold md:text-xl text-md">Author</label>
                <input {...register("author")} className= "outline-none border border-black p-1" placeholder= "Enter words in Author's name..." type = "text" />
            </div>
            <div className="space-y-1">
                <label className="font-bold md:text-xl text-md">Genres</label>
                <div className="flex flex-wrap gap-x-7 gap-y-2 px-1">
                    {
                        loadedGenres?.map((item : string) => {
                            return <GenreFilter name = {item} genres={selectedGenres} addFunc={setSelectedGenres}/>
                        })  
                    }
                </div>
            </div>
            <div className="flex md:flex-row flex-col md:gap-7 gap-3">
                <div className="flex flex-col gap-1 w-[100%]">
                    <label className="font-bold md:text-xl text-md">Published After</label>
                    <input {...register("published_after")} className= "outline-none border border-black p-1" placeholder= "YYYY-MM-DD" type = "text" />
                    {errors.published_after && <span className="text-red-500">{errors.published_after.message}</span>}
                </div>
                <div className="flex flex-col gap-1 w-[100%]">
                    <label className="font-bold md:text-xl text-md">Published Before</label>
                    <input {...register("published_before")} className= "outline-none border border-black p-1" placeholder= "YYYY-MM-DD" type = "text" />
                    {errors.published_before && <span className="text-red-500">{errors.published_before.message}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-1 w-[100%]">
                    <label className="font-bold md:text-xl text-md">ISBN</label>
                    <input {...register("isbn")} className= "outline-none border border-black p-1" placeholder= "Enter digits in ISBN" type = "text" />
                    {errors.isbn && <span className="text-red-500">{errors.isbn.message}</span>}
                </div>
                <button className="hidden md:inline rounded-lg border" type = "submit"><div className="flex items-center bg-black text-white md:text-lg text-md py-2 px-7 gap-1 rounded-lg"><IoIosSearch /><span className="font-medium">Search</span></div></button>
                <button className="md:hidden rounded-lg border" type = "submit"><div className="flex items-center bg-black text-white md:text-lg text-md py-2 px-7 gap-1 rounded-lg"><IoIosSearch /><span className="font-medium">Search</span></div></button>
        </form>
    </div>
  )
}

export default FilterComponent