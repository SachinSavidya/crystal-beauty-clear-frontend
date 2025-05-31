import { Link, Route, Routes, useNavigate} from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import AdminProductPage from "./admin/products";
import AddProductPage from "./admin/addProductForm";
import EditProductPage from "./admin/editProductForm";
import AdminOrdersPage from "./admin/orders";
import Loader from "../src/components/loader";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


export default function AdminPage(){

    const [userValidated, setUserValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(
        ()=>{
            const token = localStorage.getItem("token");
            if(!token){
                toast.error("You are not logged in");
                navigate("/login");
            }
            else{
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                    headers : {
                        Authorization : "Bearer " + token,
                    }
                } ).then(
                    (res)=>{
                        if(res.data.user.role == "admin"){
                            setUserValidated(true)
                        }else{
                            toast.error("You are not an admin");
                            navigate("/login");
                        }
                    }
                ).catch(
                    ()=>{
                        toast.error("Something went wrong. Please login again");
                        navigate("/login")
                    }
                )
            }
        }
    )

    return(
       
        <div className="w-full h-screen bg-gray-200 flex p-2">
            {
                userValidated?
                    <>
                    <div className="w-[300px] h-full flex-col flex ">
                        <Link to="/admin/users" className="flex p-2 items-center"><FaUsers className="mr-2"/>Users</Link>
                        <Link to="/admin/products" className=" p-2">Products</Link>
                        <Link to="/admin/adminOrders" className=" p-2">Orders</Link>

                    </div>
                    <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg ">
                        <Routes path="/*">
                            <Route path="/users" element={<h1>Users</h1>}/>
                            <Route path="/products" element={<AdminProductPage/>}/>
                            <Route path="/addProduct" element={<AddProductPage/>}/>
                            <Route path="/editProduct" element={<EditProductPage/>}/>
                            <Route path="/adminOrders" element={<AdminOrdersPage/>}/>

                            
                        </Routes>
                    </div>
                    </> : <Loader />
            }
            
            
        </div>
      
    )
}