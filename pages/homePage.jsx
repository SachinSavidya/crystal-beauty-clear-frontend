import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header";
import ProductPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";

export default function HomePage(){
    return(
        <>
        <div className="hidden w-full lg:flex flex-col min-h-screen">
            <Header/>
            <div className="w-full  min-h-[calc(100vh-70px)]">
                <Routes path="/*">
                    <Route path="/" element={<h1>Home page</h1>} />
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/overview/:id" element={<ProductOverview/>} />
                    <Route path="/*" element={<h1>Error 404 not found</h1>} />
                    <Route path="/cart" element={<CartPage/>} />
                    <Route path="/checkout" element={<CheckoutPage/>} />
                    
                </Routes>

            </div>
        </div>
        <div className="flex w-full lg:hidden flex-col min-h-screen">
            <Header/>
            
                <Routes path="/*">
                    <Route path="/" element={<h1>Home page</h1>} />
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/overview/:id" element={<ProductOverview/>} />
                    <Route path="/*" element={<h1>Error 404 not found</h1>} />
                    <Route path="/cart" element={<CartPage/>} />
                    <Route path="/checkout" element={<CheckoutPage/>} />
                    
                </Routes>

        </div>
        
        </>
    )
}