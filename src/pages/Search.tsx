import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FilterComponent from '../components/FilterComponent'
import { filterField } from '../zod/schemas'
import { useEffect, useState } from 'react'
import SearchWindow from '../components/SearchWindow'
import { getAllGenresApi } from '../api/bookApi'
import { SpinnerCircular } from 'spinners-react'
import { useSelector } from 'react-redux'
import { IRootState } from '../redux/store'
const Search = () => {
const navigate = useNavigate()
type filterWithGenre = filterField & {genres: String[]}
const [filter, setFilter] = useState<filterWithGenre>()
const {getGenres, gettingGenres, genres} = getAllGenresApi()
const filterOn = useSelector<IRootState, boolean>(state => state.userReducer.filter)
useEffect(() => {
  getGenres()
}, [])
const {isAuthenticated} = useAuth0()
if(!isAuthenticated){
    navigate("/")
}
if(gettingGenres){
  return (
  <>
  <Navbar />
    <div className='w-[100vw] h-[92.2vh] flex items-center justify-center'>
    <SpinnerCircular color='#ffffff'/>
  </div>
  </>
  )
}
  return (
    //two different layouts for mobiie and pc users
    <>
    <div className='hidden min-h-[100vh] md:flex flex-col'>
      <Navbar />
       <div className='flex gap-6'>
        <FilterComponent loadedGenres = {genres} filterFunc={setFilter}/>
        <SearchWindow query = {filter}/>
      </div>
    </div>
    <div className='md:hidden min-h-[100vh] flex flex-col'>
      <Navbar />
       <div className='flex flex-col'>
        <div className={`${filterOn ? "z-40" : "z-0"}`}>
            {<FilterComponent loadedGenres = {genres} filterFunc={setFilter}/>}

        </div>
        <div className={`${!filterOn ? "z-40" : "z-0"}`}>
          {<SearchWindow query = {filter}/>}
        </div>
      </div>
    </div>
    </>
  )
}

export default Search
