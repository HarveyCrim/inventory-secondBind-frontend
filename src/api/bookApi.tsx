import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { filterField } from "../zod/schemas"

type dataType = {
    title : String,
    genre: String,
    isbn : String,
    date : String,
    author : String
}

type filterType = filterField & {genres: String[]}
const backend_url = import.meta.env.VITE_BACKEND_URL
export const insertBookApi = () => {
    const {mutateAsync : insertBook, data: bookInserted, isPending: insertingBook} = useMutation({
        mutationFn : async (data: dataType) => {
            const resp = await axios({
                method : "post",
                url : backend_url+"/api/books/add",
                data,
                headers: {
                    Authorization : JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
        }
    })
    return {insertBook, bookInserted, insertingBook}
}

export const getMyBooksApi = () => {
    const {mutateAsync: fetchMyBooks, isPending: fetchingMyBooks, data: fetchedMyBooks} = useMutation({
        mutationFn: async(offSet: number) => {
            const resp = await axios({
                method: "get",
                url: backend_url+"/api/books/getmybooks?offset="+offSet,
                headers: {
                    Authorization : JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
        }
    })
    return {fetchMyBooks, fetchingMyBooks, fetchedMyBooks}
}

export const getMyBooksCountApi = () => {
    const {mutateAsync: getBookCount, isPending: gettingBookCount, data: bookCount} = useMutation({
        mutationFn: async () => {
            const resp = await axios({
                method: "get",
                url : backend_url+"/api/books/mybookscount",
                headers: {
                    Authorization : JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
        }
    })
    return {getBookCount, gettingBookCount, bookCount}
}

export const getAllGenresApi = () => {
    const {mutateAsync: getGenres, isPending: gettingGenres, data: genres} = useMutation({
        mutationFn: async () => {
            const resp = await axios({
                method : "get",
                url: backend_url+"/api/books/all-genres",
                headers: {
                    Authorization : JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
        }
    })
    return {getGenres, gettingGenres, genres}
}

export const filterBooksApi = () => {
    const {mutateAsync: filterBooks, isPending: filteringBooks, data: filteredBooks} = useMutation({
        mutationFn: async ({info, page}: {info: filterType, page: number}) => {
            console.log(info)
            const resp = await axios({
                method: "post",
                url: backend_url+"/api/books/getfilteredbooks?page="+page,
                data: {
                    title: info.title,
                    author: info.author,
                    genres: info.genres,
                    afterDate: info.published_after,
                    beforeDate: info.published_before,
                    isbn: info.isbn
                },
                headers: {
                    Authorization : JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
            // console.log(info)
        }
    })
    return {filterBooks, filteringBooks, filteredBooks}
}

export const filterBooksCountApi = () => {
    const {mutateAsync: getfilterBooksCount, isPending: gettingfilterBooksCount, data: filteredBooksCount} = useMutation({
        mutationFn: async ({info}: {info: filterType}) => {
            console.log(info)
            const resp = await axios({
                method: "post",
                url: backend_url+"/api/books/filteredbookscount",
                data: {
                    title: info.title,
                    author: info.author,
                    genres: info.genres,
                    afterDate: info.published_after,
                    beforeDate: info.published_before,
                    isbn: info.isbn
                },
                headers: {
                    Authorization : JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
            // console.log(info)
        }
    })
    return {getfilterBooksCount, gettingfilterBooksCount, filteredBooksCount}
}

export const dataForCsv = async ({info}: {info: filterType}) => {
    console.log(info)
    const resp = await axios({
        method: "post",
        url: backend_url+"/api/books/getfilteredbooks",
        data: {
            title: info.title,
            author: info.author,
            genres: info.genres,
            afterDate: info.published_after,
            beforeDate: info.published_before,
            isbn: info.isbn
        },
        headers: {
            Authorization : JSON.parse(localStorage.getItem("token") as string)
        }
    })
    return resp.data
}