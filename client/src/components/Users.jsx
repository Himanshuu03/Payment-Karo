/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    let requestTime = useRef();
    useEffect(() => {
        clearTimeout(requestTime.current);
        requestTime.current=setTimeout(()=>{
        const authToken = "Bearer "+localStorage.getItem("token");
        axios.get(`https://payment-karo.vercel.app/api/v1/user/bulk?filter=${filter}`,{
            headers :{
                authorization : authToken
            }
        } ).then(response => {
                setUsers(response.data.user)
            })
        },100)
        },[filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.fName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.fName} {user.lName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.fName);
            }} label={"Send Money"} />
        </div>
    </div>
}