import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loginWithGoogle = useGoogleLogin(
        {
            onSuccess : (res)=>{
                setLoading(true)
                axios.post(import.meta.env.VITE_BACKEND_URL+ "/api/user/google", {
                    accessToken : res.access_token
                }).then(
                    (response)=>{
                        console.log("Login successfull",response.data);
                        toast.success("Login successfull");
                        localStorage.setItem("token", response.data.token)

                        const user = response.data.user;
                        if(user.role == 'admin'){
                            navigate("/admin")
                        }else{
                            navigate("/")
                        }
                        setLoading(false);
                    }
                )
            }
        }
    )

    function handleLogin(){
        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
            email: email,
            password: password
        }).then(
            (response)=>{
                console.log("Login successfull",response.data);
                toast.success("Login successfull");
                localStorage.setItem("token", response.data.token)

                const user = response.data.user;
                if(user.role == 'admin'){
                    navigate("/admin")
                }else{
                    navigate("/")
                }
                setLoading(false);
            }
        ).catch(
            (error)=>{
                console.log("Login failed" ,error.response.data);
                toast.error(error.response.data.message || "Login failed");
                setLoading(false);
            }
        )
        
    }

    return(
        <div className="w-full bg-red-300 h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full flex justify-center items-center ">
                <div className="w-[450px] h-[500px] backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col justify-center items-center">
                    <input onChange={
                        (e)=>{
                            setEmail(e.target.value);
                        }}
                        className=" w-[400px] h-[50px] rounded-xl border border-white text-black text-center m-[5px] " placeholder="Email" type="email" />
                    <input onChange={
                        (e)=>{
                            setPassword(e.target.value);
                        }}
                        className=" w-[400px] h-[50px] rounded-xl border border-white text-black text-center m-[5px] " placeholder="Password" type="password" />
                    <button onClick={handleLogin} className="w-[400px] h-[50px] rounded-xl bg-blue-500 text-white cure cursor-pointer hover:bg-blue-600 ">
                        {loading? "Loading..." : "Login" } 
                     </button>
                     <button onClick={loginWithGoogle} className="w-[400px] h-[50px] rounded-xl bg-blue-500 text-white cure cursor-pointer hover:bg-blue-600 mt-4 flex justify-center items-center ">
                        <GrGoogle className="mr-2" />
                        {loading? "Loading..." : "Login with Google" }
                        
                     </button>
                     <p className="m-2">
                        Don't have an account yet?
                        &nbsp;
                        <span className="text-blue-500 hover:text-blue-700 ">
                            <Link to={"/register"}>Register Now</Link>
                        </span>
                     </p>
                </div>
            </div>
            <div className="w-[50%] h-full">

            </div>
            
        </div>
    )
}