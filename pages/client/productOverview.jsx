import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../src/components/loader";
import toast from "react-hot-toast";
import ImageSlider from "../../src/components/imageSlider";
import { addToCart } from "../../src/utils/cart";

export default function ProductOverview(){

    const params= useParams();
    const navigate = useNavigate();
 

    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("Loading") // loaded, error

    useEffect(
        ()=>{
            if(params.id == null){
                window.location.href = "/products"
                return;
            }
            if(status == "Loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
                    (res)=>{
                        setProduct(res.data.product)
                        setStatus("Loaded")
                    }
                ).catch(
                    ()=>{
                        toast.error("Product is not available!")
                        setStatus("Error")
                    }
                )
            }
        },[status]    
    )   
    return(
        <div className="w-full min-h-[calc(100vh-70px)]">
            {
                status == "Loading" &&
                <div className="w-full h-full flex justify-center items-center">

                <Loader/>
                </div>         
                
            }
            {
                status == "Loaded" && 
                <div className="w-full min-h-[calc(100vh-70px)] flex ">
                    <div className="w-[50%] min-h-full justify-center items-center flex ">
                       <ImageSlider images={product.images} />
                    </div>
                    <div className="w-[50%] min-h-full flex justify-center items-center flex-col p-[50px]">
                        <h1 className="text-3xl font-semibold text-center mb-4">{product.productName} <span className="text-2xl text-gray-500">{" | "}{product.altName.join(" | ")}</span></h1>
                        
                        <div className=" flex mb-3">
                        {
                            product.labeledPrice>product.price?
                            <>
                               <h2 className="text-2xl">{"LKR"} {product.price.toFixed(2)}</h2> 
                               <h2 className="text-2xl mx-4 line-through  text-gray-500">{"LKR"}{product.labeledPrice.toFixed(2)}</h2>
                               
                            </>:
                                <h2>{product.price.toFixed(2)}</h2>
                        }
                        </div>
                        <h3 className="text-xl">{product.description}</h3>
                        <div className="flex justify-center items-center mt-10">
                            <button className="border rounded-md p-3 text-lg mx-4 bg-pink-600 text-white w-[250px] h-[60px] hover:bg-white hover:text-pink-600 cursor-pointer" onClick={
                                ()=>{
                                    addToCart(product,1)
                                    toast.success("Product Added to the cart")
                                }
                            }>
                            Add to Cart
                            </button>
                            <button className="border rounded-md p-3 text-lg mx-4 bg-pink-600 text-white w-[250px] h-[60px] hover:bg-white hover:text-pink-600 cursor-pointer"
                            onClick={()=>{
                                navigate("/checkout",{
                                    state : {
                                        items : [
                                            {
                                                productId : product.productId,
                                                name : product.productName,
                                                altName : product.altName,
                                                price : product.price,
                                                labeledPrice : product.labeledPrice,
                                                image : product.images[0],
                                                quantity : 1
                                            }
                                        ] 
                                    }
                                })
                            }}>
                            Buy Now
                            </button>
                        </div>
                        
                    </div>
                </div>
            }
            {
                status == "Error" && <div>ERROR</div>
            }
        </div>
    )
}