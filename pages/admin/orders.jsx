import { use, useEffect, useState } from "react";
import Loader from "../../src/components/loader";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrdersPage(){

    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [modelDisplaying, setModelDisplaying] = useState(false);
    const [displayingOrder, setDisplyaingOrder] = useState(null);


    useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            if(!loaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+ "/api/order",{
                    headers : {
                       "Authorization" : "Bearer " + token
                    }
                }).then(
                    (res)=>{
                        console.log(res)
                        setOrders(res.data)
                        setLoaded(true)
                    }
                ).catch(
                    (err)=>{
                        console.log(err)
                    }
                )
            }
        },[loaded]
    )

    function changeOrderStatus(orderId, status){
        const token = localStorage.getItem("token")
        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/"+orderId, {
            status : status
        },{
            headers : {
                Authorization : "Bearer " + token
            }
        }).then(
            ()=>{
                toast.success("Order status changed successfully");
                setLoaded(false)
            }
        ).catch(
            (err)=>{
                toast.error("Order status change failed")
            }
        )
    }

    return(
        <div className="w-full h-full">
            {
                loaded? 
                <div className="w-full h-full">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-2">OrderID</th>
                                <th className="p-2">Customer Email</th>
                                <th className="p-2">Customer Name</th>
                                <th className="p-2">Address</th>
                                <th className="p-2">Phone Number</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Total</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            orders.map(
                                (order,index)=>{
                                    return(

                                        <tr key={index} className="border-b-gray-400 border-b hover:bg-gray-100 cursor-pointer">
                                            <td className="p-2 text-center">{order.orderId}</td>
                                            <td className="p-2 text-center">{order.email}</td>
                                            <td className="p-2 text-center">{order.name}</td>
                                            <td className="p-2 text-center">{order.address}</td>
                                            <td className="p-2 text-center">{order.phoneNumber}</td>
                                            <td className="p-2 text-center">
                                                <select value={order.status} onChange={
                                                    (e)=>{
                                                        changeOrderStatus(order.orderId, e.target.value)
                                                    }
                                                }>
                                                    <option value={"Pending"}>Pending</option>
                                                    <option value={"Delivered"}>Delivered</option>
                                                    <option value={"Cancelled"}>Cancelled</option>
                                                    <option value={"Processing"}>Processing</option>
                                                </select>
                                            </td>                                           
                                            <td className="p-2 text-center">{order.total}</td>
                                            <td className="p-2 text-center">{new Date(order.date).toDateString()}</td>
                                            <td className="p-1 text-center">
                                                <button className="p-2 bg-gray-500 rounded-sm hover:bg-gray-600 cursor-pointer text-white m-1"
                                                onClick={
                                                    ()=>{
                                                        setModelDisplaying(true)
                                                        setDisplyaingOrder(order)
                                                    }
                                                }>Details</button>
                                            </td>
                                        
                                    </tr>
                                    )
                                  
                                }
                            )
                           }
                        </tbody>
                    </table>
                    {
                        modelDisplaying &&
                        <div className="fixed w-full h-full bg-[#00000070] top-0 left-0 flex justify-center items-center">
                            <div className="w-[600px] aspect-square max-h-[600px] bg-white relative">
                                <IoClose className="absolute shadow-md shadow-gray-500 rounded-full h-[40px] w-[40px] p-2 right-[-20px] top-[-20px] bg-white cursor-pointer"
                                onClick={
                                    ()=>{
                                        setModelDisplaying(false)
                                    }
                                } />
                                <div className="w-full h-[150px]">
                                    <h1 className="text-sm font-bold p-2">Order ID : {displayingOrder.orderId}</h1>
                                    <h1 className="text-sm font-bold p-2">Order Date : {new Date(displayingOrder.date).toDateString()}</h1>
                                    <h1 className="text-sm font-bold p-2">Order Status : {displayingOrder.status}</h1>
                                    <h1 className="text-sm font-bold p-2">Order Total : {displayingOrder.total.toFixed(2)}</h1>
                                </div>
                                <div className="w-full h-[450px] max-h-[450px] overflow-y-scroll ">
                                    {
                                        displayingOrder.billItems.map(
                                            (item, index)=>{
                                                return(
                                                    <div key={index} className="w-full h-[100px] shadow-2xl my-3 relative flex items-center" >
                                                        <img src={item.image} className="h-full aspect-square object-cover"  />
                                                        <div className="m-2">
                                                            <h1 className="p-1 font-bold text-lg ">{item.productName}</h1>
                                                            <h1 className="p-1 text-gray-500 ">LKR {item.price.toFixed(2)}</h1>
                                                            <h1 className="p-1 text-gray-500">Quantity : {item.quantity}</h1>
                                                        </div>

                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>
                            </div>  

                        </div>
                    }
                    
                </div> :
                <Loader/>

            }
        </div>
    )
}

