import { useEffect, useState } from "react"
import { addToCart, getCart, removeFromCart } from "../../src/utils/cart"
import { LuTrash2 } from "react-icons/lu";

 export default function CartPage(){
    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])

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
        <div className="w-full h-full justify-center flex p-[40px]">
            <div className="w-[700px]">
                {
                    cart.map(
                        (item, index)=>{
                            return(
                                <div key={index} className="w-full h-[100px] shadow-2xl flex justify-between items-center relative mt-2">
                                    <button className="w-[30px] h-[30px] rounded-full bg-red-500 text-white absolute right-[-50px] text-lg items-center flex justify-center hover:bg-red-600 cursor-pointer"
                                    onClick={
                                        ()=>{
                                            removeFromCart(item.productId)
                                            setCartLoaded(false)
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
                                    <div className="flex items-center justify-center text-xl w-[100px] h-full">
                                        <h1>{(item.price*item.quantity).toFixed(2)}</h1>
                                    </div>

                                </div>
                            )
                        }
                    )
                }
            </div>

        </div>
    )
 }