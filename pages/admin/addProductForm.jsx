import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../src/utils/mediaUpload";

export default function AddProductPage(){

    const navigate = useNavigate();

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setlabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);

    async function handleSubmit(){

        const promisesArray = [];
        for(let i=0; i<images.length; i++){
            const promise = mediaUpload(images[i])
            promisesArray[i] = promise
        }
        try{
            const result = await Promise.all(promisesArray)

            const altNamesInArray = altNames.split(",");
            const product = {
                productId : productId,
                productName : name,
                altName : altNamesInArray,
                price : price,
                labeledPrice : labeledPrice,
                description : description,
                images : result,
                stock : stock
            }
            const token = localStorage.getItem("token")

            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product", product, {
                headers : {
                    "Authorization" : "Bearer " + token
                }
            })
            toast.success("Product added successfull");
            navigate("/admin/products");

        } catch (err){
            console.log(err);
            toast.error("Product add failed");
        }
        
    }

    return(
        <div className="w-full h-full flex justify-center items-center ">
            <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-2xl p-2 flex flex-col items-center">
                <h1 className="text-2xl font-bold m-2">Add Product</h1>
                <input 
                    value={productId}
                    onChange={
                        (e)=>{
                            setProductId(e.target.value);
                        }
                    }
                    className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" 
                    placeholder="Product ID" />

                <input 
                    value={name}
                    onChange={
                        (e)=>{
                            setName(e.target.value);
                        }
                    }
                    className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" 
                    placeholder="Product Name" />

                <input 
                    value={altNames}
                    onChange={
                        (e)=>{
                            setAltNames(e.target.value);
                        }
                    }
                    className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" 
                    placeholder="Alternative Names" />

                <input 
                    value={price}
                    onChange={
                        (e)=>{
                            setPrice(e.target.value);
                        }
                    }
                    className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" 
                    type="number"
                    placeholder="Price" />
                <input 
                    value={labeledPrice}
                    onChange={
                        (e)=>{
                            setlabeledPrice(e.target.value);
                        }
                    }
                    className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" 
                    type="number"
                    placeholder="Labeled Price" />

                <textarea 
                    value={description}
                    onChange={
                        (e)=>{
                            setDescription(e.target.value);
                        }
                    }
                    className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center p-2" 
                    placeholder="Description" />

                <input 
                    type="file"
                    onChange={
                        (e)=>{
                            setImages(e.target.files);                 
                        }
                    }
                    multiple
                    className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" 
                    placeholder="Product Images" />   

                <input 
                    value={stock}
                    onChange={
                        (e)=>{
                            setStock(e.target.value);
                        }
                    }
                    className="w-[400px] h-[50px] border m-2 border-gray-400  rounded-xl text-center" 
                    type="number"
                    placeholder="Stock" />

                <div className="w-[400px] h-[50px] flex justify-between items-center m-2">
                    <Link to={"/admin/products"} className="bg-red-500 w-[180px] h-[50px] rounded-xl text-center p-3 hover:bg-red-600 text-white ">Cancel</Link>
                    <button onClick={handleSubmit} className="w-[180px] h-[50px] bg-green-500 rounded-xl p-3 hover:bg-green-600 text-white cursor-pointer " type="submit">Add Product </button>
                </div>


            </div>
        </div>
    )
}