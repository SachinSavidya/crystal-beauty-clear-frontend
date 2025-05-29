import axios from "axios"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import Loader from "../../src/components/loader";


export default function AdminProductPage(){

    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(
        ()=>{
            if(!loaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                    (responese)=>{
                        setProducts(responese.data);
                        setLoaded(true);
                    }
                )
            }
            
        },
        [loaded]
    )

    async function deleteProduct(id){
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login to delete a product")
            return;
        }
        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id, {
                headers : {
                    Authorization : "Bearer " +token
                }
            })
            toast.success("Product deleted successsfully");
        }catch(err){
            console.log(err)
            toast.error("Error deleting product")
            return;
        }
        

    }
    

    

    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/addProduct"} className="bg-gray-400 p-3 text-3xl rounded-full absolute right-5 bottom-5 hover:bg-gray-300 hover:text-white cursor-pointer ">
                <FaPlus />
            </Link>
            {loaded&&<table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">labeled Price</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Action</th>
                    </tr>           
                </thead>
                <tbody>
                {
                products.map(
                    (product,index)=>{
                        return(
                            <tr key={index} className="text-center hover:bg-gray-100 cursor-pointer border-b border-b-gray-300 ">
                                <td className="p-2">{product.productId}</td>
                                <td className="p-2">{product.productName}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.labeledPrice}</td>
                                <td className="p-2">{product.stock}</td>
                                <td className="p-2">
                                    <div className="w-full h-full flex justify-center">
                                        <FaRegTrashAlt onClick={
                                            ()=>{
                                                deleteProduct(product.productId)
                                                setLoaded(false);
                                            }
                                        } 
                                        className="m-2 text-lg hover:text-red-500 " />
                                        <GrEdit onClick={
                                            ()=>{
                                                navigate("/admin/editProduct", {
                                                    state: product
                                                })
                                            }
                                        } className="m-2 text-lg hover:text-blue-500 " />
                                    </div>
                                </td>
                                
                            </tr>
                        )
                    }
                ) 
                }
                </tbody>
            </table>}

            {
                !loaded&& <Loader/>
            }

             

             
            
        </div>
    )
}    
