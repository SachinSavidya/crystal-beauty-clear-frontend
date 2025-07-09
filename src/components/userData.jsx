import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData(){
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(
        ()=>{
            if(token){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                    headers : {
                        Authorization : "Bearer " + token
                    }
                } ).then(
                    (res)=>{
                        setUser(res.data.user);
                    }
                ).catch(
                    (err)=>{
                        console.log(err);
                    }
                )
            }
        }
    )

    return(
        <>
            {
                user == null?
                <div className="flex justify-center items-center h-full">
                    <Link to="/login" className="bg-pink-400 p-2 rounded-md hover:bg-pink-500 text-white mx-2 ">Login</Link>
                    <Link to="/register" className="bg-pink-400 p-2 rounded-md hover:bg-pink-500 text-white ">Register</Link>
                </div>
                :
                <div className="flex justify-center items-center h-full">
                    <button className="bg-pink-400 p-2 rounded-md hover:bg-pink-500 text-white cursor-pointer " onClick={
                        ()=>{
                            setUser(null)
                            localStorage.removeItem("token");
                            window.location = "/login";
                        }
                    }>Log Out</button>
                </div>
            }
        </>
    )
} 