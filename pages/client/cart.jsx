import { useEffect, useState } from "react"
import { addToCart, getCart, getLabaledTotal, getTotal, removeFromCart } from "../../src/utils/cart"
import { LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

 export default function CartPage(){
    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])
    const navigate = useNavigate();

    useEffect(
        ()=>{
            if(cartLoaded==false){
                const cart = getCart()
                setCart(cart)
                setCartLoaded(true)
            }
        },[cartLoaded]
    )

    return(
        <div className="w-full h-full justify-center flex lg:p-[40px] p-3">
            <div className="w-full lg:w-[700px]">
                {
                    cart.map(
                        (item, index)=>{
                            return(
                                <>
                                {/* for large screen */}
                                <div key={index} className="hidden w-full lg:h-[100px] shadow-2xl lg:flex justify-between items-center relative mt-2">
                                    <button className="w-[30px] h-[30px] rounded-full bg-red-500 text-white lg:absolute right-[-50px] text-lg items-center flex justify-center hover:bg-red-600 cursor-pointer"
                                    onClick={
                                        ()=>{
                                            removeFromCart(item.productId)
                                            setCartLoaded(false)
                                        }
                                    }>
                                        <LuTrash2 />
                                    </button>
                                    <img src={item.image} className="h-[150px] lg:h-full object-cover aspect-square" />
                                    <div className="lg:w-[300px] lg:max-w-[300px] overflow-hidden">
                                        <h1 className="text-lg font-semibold">{item.productName}</h1>
                                        <h2 className="text-gray-700">{item.altName}</h2>
                                        <h2 className="text-gray-700"><span>LKR </span>{item.price.toFixed(2)}</h2>
                                    </div>
                                    <div className=" w-[120px] h-[100px] flex justify-center items-center text-2xl font-semibold">
                                        <button className="w-[25px] h-[25px] rounded-full text-white bg-black items-center justify-center text-[15px] mx-2" on onClick={
                                            ()=>{
                                                addToCart(item,-1)
                                                setCartLoaded(false)
                                            }
                                        }>-</button>
                                        <h1 className="w-[30px] h-full flex justify-center items-center ">{item.quantity}</h1>
                                        <button className="w-[25px] h-[25px] rounded-full text-white bg-black items-center justify-center text-[15px] mx-2" on onClick={
                                            ()=>{
                                                addToCart(item,1)
                                                setCartLoaded(false)
                                            }
                                        }>+</button>
                                    </div>
                                    <div className="flex items-center justify-end text-xl w-[100px] h-full pr-3">
                                        <h1>{(item.price*item.quantity).toFixed(2)}</h1>
                                    </div>

                                </div>

                                {/* mobile screen */}
                                <div key={index} className="lg:hidden w-full h-[150px] shadow-2xl my-3 rounded-sm flex relative">
                                        <img src={item.image} className="h-[150px] lg:h-full object-cover aspect-square rounded-l-sm" />
                                        <div className=" w-[180px] overflow-hidden flex flex-col justify-center ml-4 mr-2">
                                            <h1 className="text-md font-semibold p-1">{item.productName}</h1>
                                            <h2 className="text-gray-700 text-sm p-1">{item.altName.join(" | ")}</h2>
                                            <h2 className="text-black font-semibold p-1"><span>LKR </span>{item.price.toFixed(2)}</h2>
                                        </div>
                                        <div className=" w-[75px] h-[30px] flex text-md font-semibold rounded-sm">
                                            <button className="w-[25px] h-[25px] flex  border-gray-200 items-center justify-center rounded-full  " on onClick={
                                                ()=>{
                                                    addToCart(item,-1)
                                                    setCartLoaded(false)
                                                }
                                            }>-</button>
                                            <h1 className="w-[25px] h-[25px] flex justify-center items-center ">{item.quantity}</h1>
                                            <button className="w-[25px] h-[25px] flex rounded-full items-center justify-center" on onClick={
                                                ()=>{
                                                    addToCart(item,1)
                                                    setCartLoaded(false)
                                                }
                                            }>+</button>
                                        </div>
                                        <button className="w-[30px] h-[30px] rounded-full bg-red-500 text-white absolute right-2 bottom-2 text-lg items-center flex justify-center hover:bg-red-600 cursor-pointer"
                                            onClick={
                                                ()=>{
                                                    removeFromCart(item.productId)
                                                    setCartLoaded(false)
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
                <div className="w-full h-[100px] justify-end flex pr-3 text-xl mt-2 ">
                    <div className="w-[100px] pr-2">
                        <h1 className=" flex justify-end">Total :</h1>
                        <h1 className=" flex justify-end">Discount :</h1>
                        <h1 className=" flex justify-end">Net Total :</h1>
                    </div>
                    <div className="w-[80px] ">
                        <h1 className=" flex justify-end">{getLabaledTotal().toFixed(2)}</h1>
                        <h1 className=" flex justify-end border-b-2">{(getLabaledTotal()-getTotal()).toFixed(2)}</h1>
                        <h1 className=" flex justify-end border-b-4 border-double font-semibold">{getTotal().toFixed(2)}</h1>
                    </div>  
                </div>
                <div className="flex justify-end w-full">
                    <button className="w-[180px] text-center flex justify-center bg-pink-400 p-2 rounded-xl text-xl mt-2 text-white cursor-pointer hover:bg-pink-500"
                    onClick={
                        ()=>{
                            navigate("/checkout",
                            {
                                state : {
                                    items : cart
                                }
                            })
                        }} >
                    Checkout</button>
                </div>
                
            </div>

        </div>
    )
 }