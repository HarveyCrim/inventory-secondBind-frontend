import { bookField } from "../zod/schemas"
type inventoryField = Omit<bookField, "date"> & {userId: number, date: Date, entryId: number}
const InventoryCard = (data : inventoryField) => {
  return (
    <div className="flex space-x-3 md:space-x-8 border shadow-sm border-gray-400 md:rounded-md md:max-w-[950px] w-[90%] mt-0.5">
        <div className="bg-black flex flex-col justify-center w-[40px] md:w-[100px] relative">
            <span className="text-white text-xs md:font-medium text-sm absolute top-1 left-1">ID</span>
            <h4 className="text-white text-xl md:text-4xl text-center">{data.entryId}</h4>
        </div>
        <div className="py-1 flex flex-col text-sm md:text-lg">
            <div className="space-x-1">
                <span className="font-medium">Title:</span>
                <span>{data.title}</span>
            </div>
            <div className="flex space-x-2">
                <div className="space-x-1">
                    <span className="font-medium">Author:</span>
                    <span>{data.author}</span>
                </div>
                <span className="font-bold">|</span>
                <div className="space-x-1">
                    <span className="font-medium">Genre:</span>
                    <span>{data.genre}</span>
                </div>
            </div>
            <div className=" space-x-2 hidden md:flex">
                <div className="space-x-1">
                    <span className="font-medium">Publication Date:</span>
                    <span>24 March 2023</span>
                </div>
                <span className="font-bold hidden md:inline">|</span>
                <div className="space-x-1">
                    <span className="font-medium">ISBN</span>
                    <span>{data.isbn}</span>
                </div>
            </div>
            <div className="space-x-1 md:hidden">
                <span className="font-medium">Pub. Date:</span>
                <span>{"24 March 2023"}</span>
            </div>
            <div className="space-x-1 md:hidden">
                <span className="font-medium">IBSN:</span>
                <span>{data.isbn}</span>
            </div>
        </div>
    </div>
  )
}

export default InventoryCard