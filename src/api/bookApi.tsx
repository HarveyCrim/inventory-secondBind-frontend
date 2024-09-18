import { useMutation } from "@tanstack/react-query"
import axios from "axios"

type dataType = {
    title : String,
    genre: String,
    isbn : String,
    date : String,
    author : String
}
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