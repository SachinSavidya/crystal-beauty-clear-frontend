import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../src/components/loader";
import toast from "react-hot-toast";

export default function ProductOverview(){

    const params= useParams();
    if(params.id == null){
        window.location.href = "/products"
    }

    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("Loading") // loaded, error

    useEffect(
        ()=>{
            if(status == "Loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
                    (res)=>{
                        setProduct(res.data)
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
        <div className="w-full h-full">
            {
                status == "Loading" && <Loader/>
            }
            {
                status == "Loaded" && <div>Product</div>
            }
            {
                status == "Error" && <div>ERROR</div>
            }
        </div>
    )
}