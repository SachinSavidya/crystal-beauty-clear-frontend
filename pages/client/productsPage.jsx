import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../src/components/loader";
import ProductCard from "../../src/components/product-card";

export default function ProductPage(){

    const [productList, setProductList] = useState([]);
    const [productLoaded, setProductLoaded] = useState(false);

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (res)=>{
                    setProductList(res.data);
                    setProductLoaded(true)
                }
            )
        },[productLoaded]
        
    )
    return(
        <div className="w-full h-full">
            {
                productLoaded ?
                <div className="w-full h-full flex flex-wrap justify-center">
                {
                    productList.map(
                       (product,index)=>{
                            return(
                                <ProductCard key={index} product={product} />
                            )
                            
                       } 
                    )
                }
                </div>
                :
                <div className="w-full h-full flex justify-center items-center">
                <Loader/>
                </div>
                
            
                
            }  
        </div>
    )

}