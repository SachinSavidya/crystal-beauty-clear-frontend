import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin(){
        console.log("Email : ",email);
        console.log("Password : ",password);

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
            }
        ).catch(
            (error)=>{
                console.log("Login failed" ,error.response.data);
                toast.error(error.response.data.message || "Login failed");
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
                    <button onClick={handleLogin} className="w-[400px] h-[50px] rounded-xl bg-blue-500 text-white cure cursor-pointer "> Log in</button>
                </div>
            </div>
            <div className="w-[50%] h-full">

            </div>
            
        </div>
    )
}