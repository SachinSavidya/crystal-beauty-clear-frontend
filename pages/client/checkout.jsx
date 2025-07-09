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
            navigate("/products"); 
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
        <div className="w-ful  min-h-[calc(100vh-70px)] justify-center flex flex-col lg:flex-row lg:p-[40px] p-3">
            <div className="w-full lg:w-[700px]">
                {
                    cart.map(
                        (item, index)=>{
                            return(
                                <>
                                {/* for large screen */}

                                <div key={index} className=" hidden w-full h-[100px] shadow-2xl lg:flex justify-between items-center relative mt-2">
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
                                        <h2 className="text-gray-700">{item.altName.join(" | ")}</h2>
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

                                {/* for mobile screen */}
                                
                                <div key={index} className="lg:hidden w-full h-[150px] shadow-2xl my-3 rounded-sm flex relative">
                                    <img src={item.image} className="h-[150px] lg:h-full object-cover aspect-square rounded-l-sm" />
                                    <div className=" w-[150px] overflow-hidden flex flex-col justify-center ml-4 mr-2">
                                        <h1 className="text-md font-semibold p-1">{item.productName}</h1>
                                        <h2 className="text-gray-700 text-sm p-1">{item.altName.join(" | ")}</h2>
                                        <h2 className="text-black font-semibold p-1"><span>LKR </span>{item.price.toFixed(2)}</h2>
                                    </div>
                                    <div className=" w-[75px] h-[30px] flex text-md font-semibold rounded-sm absolute right-0 top-0">
                                        <button className="w-[25px] h-[25px] flex  border-gray-200 items-center justify-center rounded-full  "  onClick={
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
                                        <h1 className="w-[25px] h-[25px] flex justify-center items-center ">{item.quantity}</h1>
                                        <button className="w-[25px] h-[25px] flex rounded-full items-center justify-center"  onClick={
                                            ()=>{
                                                const newCart = cart
                                                newCart[index].quantity += 1
                                                setCart(newCart)
                                                setCartRefresh(!cartRefresh)

                                            }
                                        }>+</button>
                                    </div>
                                    <button className="w-[30px] h-[30px] rounded-full bg-red-500 text-white absolute right-2 bottom-2 text-lg items-center flex justify-center hover:bg-red-600 cursor-pointer"
                                        onClick={
                                        ()=>{
                                            const newCart = cart.filter((product)=>product.productId !== item.productId)
                                            setCart(newCart)
                                        }
                                    }>
                                            <LuTrash2 />
                                    </button>            
                                </div>

                                </>
                            )
                        }
                    )
                }
                
                
            </div>
            <div className="lg:w-[50%] lg:pl-[60px] w-full h-full ">
                <div className="w-full h-[200px] flex lg:justify-end lg:p-1 mt-4 lg:mt-0 ">
                    <div className="w-full lg:w-[402px] lg:mr-2.5">
                        <input className=" border border-gray-600 w-full lg:w-[400px] h-[50px] rounded-lg text-center text-xl lg:m-1 mb-1.5" placeholder="Name"
                        onChange={
                            (e)=>{
                               setName(e.target.value) 
                            }
                        } />
                        <input className=" border border-gray-600 w-full lg:w-[400px] h-[50px] rounded-lg text-center text-xl lg:m-1 mb-1.5" placeholder="Address"
                        onChange={
                            (e)=>{
                               setAddress(e.target.value) 
                            }
                        } />
                        <input className=" border border-gray-600 w-full lg:w-[400px] h-[50px] rounded-lg text-center text-xl lg:m-1 mb-1.5" placeholder="Phone Number"
                        onChange={
                            (e)=>{
                               setPhone(e.target.value) 
                            }
                        } />
                    </div>
                    
                </div>
                <div className="w-full h-[100px] justify-end flex lg:pr-3 pr-1 text-xl lg:mt-2 ">
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
                    <button className="lg:w-[398px] w-full h-[50px] text-center flex justify-center bg-pink-400 p-2 rounded-lg text-xl mt-2 lg:mr-2.5 text-white cursor-pointer hover:bg-pink-500"
                    onClick={
                        ()=>{
                            placeOrder();
                            navigate("/products",
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