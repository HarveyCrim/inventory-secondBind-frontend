import { useMutation } from "@tanstack/react-query"
import axios from "axios"
const backend_url = import.meta.env.VITE_BACKEND_URL

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
        }
    })
    return {userData, findingUser, findUser}
}