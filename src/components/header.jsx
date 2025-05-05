import { Link } from "react-router-dom";

export default function Header(){
    return(
        <div className="w-full h-[70px] flex justify-center items-center bg-gray-200">
            <div className="w-[400px] flex justify-evenly text-xl text-pink-400">
                <Link className=" hover:text-pink-600" to="/">Home</Link>
                <Link className=" hover:text-pink-600" to="/products">Products</Link>
                <Link className=" hover:text-pink-600" to="/about">About</Link>
                <Link className=" hover:text-pink-600" to="/contact">Contact</Link>
            </div>

        </div>
        
    )
}