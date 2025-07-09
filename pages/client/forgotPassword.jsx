import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasssword(){

    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    function sendEmail(){
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendMail",{
            email : email
        }).then(
            (res)=>{
                console.log(res.data);
                setEmailSent(true);
                toast.success("Email sent successfully")
            }
        ).catch(
            (err)=>{
                console.log(err);
                toast.error("Something went wrong")
            }
        )
    }

    return(
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            {
                emailSent?
                <div className="w-[500px] bg-white shadow-xl p-4 ">
                    <h1 className="font-bold text-2xl mb-[30px] mt-2">Reset Password</h1>
                    <div className="flex flex-col ">
                        <form autoComplete="off" className="flex flex-col ">
                        <label className="text-lg mb-1">OTP</label>
                        <input autoComplete="one-time-code" name="otp" className=" rounded-md p-2 border border-gray-300 h-[50px] mb-3 " required />
                        <label className="text-lg mb-1">New Password</label>
                        <input name="password" type="password" className=" rounded-md p-2 border border-gray-300 h-[50px] mb-3 " required />
                        <label className="text-lg mb-1">Confirm Password</label>
                        <input name="password" type="password" className=" rounded-md p-2 border border-gray-300 h-[50px] mb-3 " required />
                        </form>
                        <button className=" text-lg mt-3 cursor-pointer rounded-md h-[50px] text-white bg-blue-500 hover:bg-blue-600" type="submit">Reset Password</button>
                    </div>
                </div>:

                <div className="w-[500px] bg-white shadow-xl p-4 ">
                    <h1 className="font-bold text-2xl mb-[30px] mt-2">Forgot Password</h1>
                    <div className="flex flex-col ">
                        <label className="text-xl mb-1">Email</label>
                        <input className=" p-2 rounded-md border text-lg border-gray-300 h-[50px] mb-3 "  required onChange={
                            (e)=>{
                                setEmail(e.target.value)
                            }
                        } />
                        <button className=" text-lg cursor-pointer rounded-md h-[50px] text-white bg-blue-500 hover:bg-blue-600" type="submit"
                        onClick={sendEmail}>Send Reset Link</button>
                    </div>
                </div>
            }
            

        </div>
    )
}