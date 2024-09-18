import {SubmitHandler, useForm} from "react-hook-form"
import { addEntrySchema } from "../zod/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { insertBookApi } from "../api/bookApi"
import { SpinnerCircular } from 'spinners-react';
import {toast} from "sonner"
const AddEntryForm = () => {
  const {insertBook, insertingBook} = insertBookApi()
  type entrySchemaType = Zod.infer<typeof addEntrySchema>
  const {register, handleSubmit, formState : {errors}, reset} = useForm<entrySchemaType>({
    resolver : zodResolver(addEntrySchema)
  })
  const onSubmit: SubmitHandler<entrySchemaType> = async (data : entrySchemaType) => {
    await insertBook(data)
    reset()
    toast.success("Entry Successfully added")
  }
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
            <label className="md:text-xl font-medium">Title</label>
            <input className="outline-none w-[300px] md:w-[500px] p-1 md:p-2 border-2" {...register("title")} type = "text" />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>
        <div className="flex flex-col">
            <label className="md:text-xl font-medium">Genre</label>
            <input className="outline-none w-[300px] md:w-[500px] p-1 md:p-2 border-2"{...register("genre")} type = "text" />
            {errors.genre && <span className="text-red-500">{errors.genre.message}</span>}
        </div>
        <div className="flex flex-col">
            <label className="md:text-xl font-medium">Publication Date</label>
            <input placeholder= "YYYY-MM-DD format only." className="outline-none w-[300px] md:w-[500px] p-1 md:p-2 border-2"{...register("date")} type = "text" />
            {errors.date && <span className="text-red-500">{errors.date.message}</span>}
        </div>
        <div className="flex flex-col">
            <label className="md:text-xl font-medium">Author</label>
            <input className="outline-none w-[300px] md:w-[500px] p-1 md:p-2 border-2"{...register("author")} type = "text" />
            {errors.author && <span className="text-red-500">{errors.author.message}</span>}
        </div>
        <div className="flex flex-col">
            <label className="md:text-xl font-medium">ISBN</label>
            <input placeholder="13 Digit ISBN" className="outline-none w-[300px] md:w-[500px] p-1 md:p-2 border-2"{...register("isbn")} type = "text" />
            {errors.isbn &&<span className="text-red-500">{errors.isbn.message}</span>}
        </div>
        <button type = "submit" className="w-[300px] md:w-[500px] bg-black text-white font-medium h-[50px] rounded-lg">{insertingBook ? <div className="flex justify-center"><SpinnerCircular color="#ffffff" size = "30px"/> </div>: "Add to Inventory"}</button>
    </form>
  )
}

export default AddEntryForm