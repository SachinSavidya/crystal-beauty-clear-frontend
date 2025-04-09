export default function LoginPage(){
    return(
        <div className="w-full bg-red-300 h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full flex justify-center items-center ">
                <div className="w-[450px] h-[500px] backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col justify-center items-center">
                    <input className=" w-[400px] h-[50px] rounded-xl border border-white text-black text-center m-[5px] " placeholder="Email" type="email" />
                    <input className=" w-[400px] h-[50px] rounded-xl border border-white text-black text-center m-[5px] " placeholder="Password" type="password" />
                    <button className="w-[400px] h-[50px] rounded-xl bg-blue-500 text-white cure cursor-pointer "> Log in</button>
                </div>
            </div>
            <div className="w-[50%] h-full">

            </div>
            
        </div>
    )
}