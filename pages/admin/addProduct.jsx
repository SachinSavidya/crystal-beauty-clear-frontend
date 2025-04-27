import { Link } from "react-router-dom";

export default function AddProductPage(){

    return(
        <div className="w-full h-full flex justify-center items-center ">
            <div className="w-[500px] h-[550px] bg-white rounded-lg shadow-2xl p-2 flex flex-col items-center">
                <input className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" placeholder="Product ID" />
                <input className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" placeholder="Product Name" />
                <input className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" placeholder="Alternative Names" />
                <input className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" placeholder="Price" />
                <textarea className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" placeholder="Description" />
                <input className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" placeholder="Stock" />
                <div className="w-[400px] h-[50px] flex justify-between items-center m-2">
                    <Link to={"/admin/products"} className="bg-red-500 w-[180px] h-[50px] rounded-xl text-center p-3 hover:bg-red-600 text-white ">Cancel</Link>
                    <button className="w-[180px] h-[50px] bg-green-500 rounded-xl p-3 hover:bg-green-600 text-white cursor-pointer " type="submit">Add Product </button>
                </div>


            </div>
        </div>
    )
}