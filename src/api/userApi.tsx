import { useMutation } from "@tanstack/react-query"
import axios from "axios"
const backend_url = import.meta.env.VITE_BACKEND_URL


//user api

export const getUserFromDb = () => {
    const {data: userData, isPending : findingUser, mutateAsync : findUser} = useMutation({
        mutationFn : async ({email, name} : {email : String, name : String}) => {
            const resp = await axios({
                method : "post",
                data : {
                    email, name
                },
                url : backend_url+"/api/user/create"
            })
            return resp.data
        },
        onSuccess(data) {
            localStorage.setItem("token", JSON.stringify(data.token))
        },
    })
    return {userData, findingUser, findUser}
}