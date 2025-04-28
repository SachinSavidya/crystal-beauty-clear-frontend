import axios from "axios"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function AdminProductPage(){

    const [products, setProducts] = useState([])

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (responese)=>{
                    setProducts(responese.data);
                }
            )
        },
        []
    )

    

    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/addProduct"} className="bg-gray-400 p-3 text-3xl rounded-full absolute right-5 bottom-5 hover:bg-gray-300 hover:text-white cursor-pointer ">
                <FaPlus />
            </Link>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">labeled Price</th>
                        <th className="p-2">Stock</th>
                    </tr>           
                </thead>
                <tbody>
                {
                products.map(
                    (product,index)=>{
                        return(
                            <tr key={index} className="text-center hover:bg-gray-700 hover:text-white cursor-pointer">
                                <td className="p-2">{product.productId}</td>
                                <td className="p-2">{product.productName}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.labeledPrice}</td>
                                <td className="p-2">{product.stock}</td>
                            </tr>
                        )
                    }
                ) 
                }
                </tbody>
            </table>
            
        </div>
    )
}
//https://kwfxlzqkmqonkmraqvgi.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3ZnhsenFrbXFvbmttcmFxdmdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3OTEzMTYsImV4cCI6MjA2MTM2NzMxNn0.GjbH0fRmANh7cWvZye4vZXAqiGOPJGAEM62BVX1wd-E