import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header";
import ProductPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";

export default function HomePage(){
    return(
        <div className="w-full h-screen max-h-screen">
            <Header/>
            <div className="w-full min-h-[calc(100vh-70px)] bg-pink-100">
                <Routes path="/*">
                    <Route path="/" element={<h1>Home page</h1>} />
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/overview/:id" element={<ProductOverview/>} />
                    <Route path="/*" element={<h1>Error 404 not found</h1>} />
                    
                </Routes>

            </div>
        </div>
    )
}