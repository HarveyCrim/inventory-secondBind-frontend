import { useState } from "react"

const GenreFilter = ({genres, name, addFunc} : {genres: String[], name : string, addFunc: React.Dispatch<React.SetStateAction<String[]>>}) => {
  const [added, setAdded] = useState<boolean>(false)
  const clicked = () => {
    if(!added){
        addFunc([...genres, name])
    }
    else{
        const index = genres.findIndex((item) => item === name)
        const newGenres = [...genres]
        newGenres.splice(index, 1)
        addFunc(newGenres)
    }
    setAdded(!added)
  }
  return (
    <div className="flex gap-1.5">
        <input onClick = {clicked} type = "checkbox" className="scale-150 hei" />
        <span className="text-lg">{name}</span>
    </div>
  )
}

export default GenreFilter