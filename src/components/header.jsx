import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useState } from "react";
import { IoArrowBackCircleOutline, IoMenu } from "react-icons/io5";

export default function Header(){

    const [isOpened, setIsOpened] = useState(false);

    return(
        <div className=" w-full h-[70px] flex justify-center items-center bg-gray-200  relative">
            <div className="w-[400px] hidden lg:flex justify-evenly text-xl text-pink-400">
                <Link className=" hover:text-pink-600" to="/">Home</Link>
                <Link className=" hover:text-pink-600" to="/products">Products</Link>
                <Link className=" hover:text-pink-600" to="/about">About</Link>
                <Link className=" hover:text-pink-600" to="/contact">Contact</Link>
                <Link className="text-4xl absolute right-6 mr-2 hover:text-pink-600" to="/cart"><BsCart4 /></Link>
            </div>
            <div className="flex justify-between w-full lg:hidden px-3">
                <IoMenu className=" text-pink-400 hover:text-pink-600 text-4xl" onClick={
                    ()=>{
                    setIsOpened(!isOpened)
                    }
                } />
                <Link className="text-4xl text-pink-400  mr-2 hover:text-pink-600" to="/cart"><BsCart4 /></Link>

                {
                isOpened &&
                <div className="fixed top-0 left-0 w-full min-h-screen bg-[#000000] z-10 flex justify-center items-center flex-col text-2xl text-white font-bold">
                    <IoArrowBackCircleOutline className="fixed top-3 left-3 text-5xl" onClick={
                    ()=>{
                    setIsOpened(!isOpened)
                    }
                    } />
                    <Link className=" hover:text-pink-600 py-4" to="/" onClick={
                    ()=>{
                    setIsOpened(!isOpened)
                    }
                    }>Home</Link>
                    <Link className=" hover:text-pink-600 py-4" to="/products" onClick={
                    ()=>{
                    setIsOpened(!isOpened)
                    }
                    }>Products</Link>
                    <Link className=" hover:text-pink-600 py-4" to="/about" onClick={
                    ()=>{
                    setIsOpened(!isOpened)
                    }
                    }>About</Link>
                    <Link className=" hover:text-pink-600 py-4" to="/contact" onClick={
                    ()=>{
                    setIsOpened(!isOpened)
                    }
                    }>Contact</Link>
                </div>
                    
                }
            </div>
        </div>
        
    )
}