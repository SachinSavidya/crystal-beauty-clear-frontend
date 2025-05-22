import { useState } from "react"
import { LuTrash2 } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage(){
    const location = useLocation();
    const [cartRefresh, setCartRefresh ] = useState(false)
    const [cart, setCart] = useState(location.state.items)
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    function placeOrder(){

        const orderdata = {
            name : name,
            address : address,
            phoneNumber : phone,
            billItems : []
        }
        for(let i = 0; i<cart.length; i++){
            orderdata.billItems[i] = {
                productId : cart[i].productId,
                quantity : cart[i].quantity
            }
        } 

        const token = localStorage.getItem("token");
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderdata, {
            headers : {
                Authorization : "Bearer " + token,
            }
        }).then(()=>{
            toast.success("Order places successfully");
            navigate("/")
        }).catch((err)=>{
            console.log(err);
            toast.error("Order placement failed") 
        })

      
    }

    function getTotal(){
        let total = 0
        cart.forEach(
            (item)=>{
                total += item.price * item.quantity
            }
        )
        return total;
    }

    function getLabeledTotal(){
        let total = 0
        cart.forEach(
            (item)=>{
                total += item.labeledPrice * item.quantity
            }
        )
        return total;
    }


    return(
        <div className="w-ful  min-h-[calc(100vh-70px)] justify-center flex p-[40px] ">
            <div className="w-[50%]">
                {
                    cart.map(
                        (item, index)=>{
                            return(
                                <div key={index} className="w-full h-[100px] shadow-2xl flex justify-between items-center relative mt-2">
                                    <button className="w-[30px] h-[30px] rounded-full bg-red-500 text-white absolute right-[-50px] text-lg items-center flex justify-center hover:bg-red-600 cursor-pointer"
                                    onClick={
                                        ()=>{
                                            const newCart = cart.filter((product)=>product.productId !== item.productId)
                                            setCart(newCart)
                                        }
                                    }>
                                        <LuTrash2 />
                                    </button>
                                    <img src={item.image} className="h-full object-cover aspect-square" />
                                    <div className="w-[300px] max-w-[300px] overflow-hidden">
                                        <h1 className="text-lg font-semibold">{item.productName}</h1>
                                        <h2 className="text-gray-700">{item.altName}</h2>
                                        <h2 className="text-gray-700"><span>LKR </span>{item.price.toFixed(2)}</h2>
                                    </div>
                                    <div className=" w-[120px] h-[100px] flex justify-center items-center text-2xl font-semibold">
                                        <button className="w-[25px] h-[25px] rounded-full text-white bg-black items-center justify-center text-[15px] mx-2" on onClick={
                                            ()=>{
                                                const newCart = cart
                                                newCart[index].quantity -=1
                                                if(newCart[index].quantity <=0){
                                                    newCart[index].quantity = 1
                                                }
                                                setCart(newCart)
                                                setCartRefresh(!cartRefresh)
  
                                            }
                                        }>-</button>
                                        <h1 className="w-[30px] h-full flex justify-center items-center ">{item.quantity}</h1>
                                        <button className="w-[25px] h-[25px] rounded-full text-white bg-black items-center justify-center text-[15px] mx-2" on onClick={
                                            ()=>{
                                                const newCart = cart
                                                newCart[index].quantity += 1
                                                setCart(newCart)
                                                setCartRefresh(!cartRefresh)

                                            }
                                        }>+</button>
                                    </div>
                                    <div className="flex items-center justify-end text-xl w-[100px] h-full pr-3">
                                        <h1>{(item.price*item.quantity).toFixed(2)}</h1>
                                    </div>

                                </div>
                            )
                        }
                    )
                }
                
                
            </div>
            <div className="w-[50%] pl-[60px] h-full ">
                <div className="w-full h-[200px] flex justify-end p-1  ">
                    <div className="w-[402px] mr-2.5">
                        <input className=" border border-gray-600 w-[400px] h-[50px] rounded-lg text-center text-xl m-1 mb-1.5" placeholder="Name"
                        onChange={
                            (e)=>{
                               setName(e.target.value) 
                            }
                        } />
                        <input className=" border border-gray-600 w-[400px] h-[50px] rounded-lg text-center text-xl m-1 mb-1.5" placeholder="Address"
                        onChange={
                            (e)=>{
                               setAddress(e.target.value) 
                            }
                        } />
                        <input className=" border border-gray-600 w-[400px] h-[50px] rounded-lg text-center text-xl m-1 mb-1.5" placeholder="Phone Number"
                        onChange={
                            (e)=>{
                               setPhone(e.target.value) 
                            }
                        } />
                    </div>
                    
                </div>
                <div className="w-full h-[100px] justify-end flex pr-3 text-xl mt-2 ">
                    <div className="w-[100px] pr-2">
                        <h1 className=" flex justify-end">Total :</h1>
                        <h1 className=" flex justify-end">Discount :</h1>
                        <h1 className=" flex justify-end">Net Total :</h1>
                    </div>
                    <div className="w-[80px] ">
                        <h1 className=" flex justify-end">{getLabeledTotal().toFixed(2)}</h1>
                        <h1 className=" flex justify-end border-b-2">{(getLabeledTotal()-getTotal()).toFixed(2)}</h1>
                        <h1 className=" flex justify-end border-b-4 border-double font-semibold">{getTotal().toFixed(2)}</h1>
                    </div>  
                </div>
                <div className="flex justify-end w-full">
                    <button className="w-[398px] h-[50px] text-center flex justify-center bg-pink-400 p-2 rounded-lg text-xl mt-2 mr-2.5 text-white cursor-pointer hover:bg-pink-500"
                    onClick={
                        ()=>{
                            placeOrder();
                            navigate("/",
                            {
                                state : {
                                    items : cart
                                }
                            })
                        }} >
                    Place Order</button>
                </div>
            </div>

        </div>
    )
}