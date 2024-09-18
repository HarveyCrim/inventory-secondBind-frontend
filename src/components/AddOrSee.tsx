import AddEntryForm from "./AddEntryForm";
import ShowEntries from "./ShowEntries";
const AddOrSee = ({add} : {add: boolean}) => {
  return (
    <div className="w-full">
        {add && <div className="mt-10 md:mt-0 flex items-center justify-center h-[100%]"><AddEntryForm /></div>}
        {!add && <div className="z-10 md:mt-0 flex w-full items-center justify-center"><ShowEntries /></div>}

    </div>
  )
}

export default AddOrSee