import { Link, Route, Routes} from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import AdminProductPage from "./admin/products";
import AddProductPage from "./admin/addProductForm";
import EditProductPage from "./admin/editProductForm";
import AdminOrdersPage from "./admin/orders";


export default function AdminPage(){
    return(
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="w-[300px] h-full flex-col flex ">
                <Link to="/admin/users" className="flex p-2 items-center"><FaUsers className="mr-2"/>Users</Link>
                <Link to="/admin/products" className=" p-2">Products</Link>
                <Link to="/admin/adminOrders" className=" p-2">Orders</Link>

            </div>
            <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg ">
                <Routes path="/*">
                    <Route path="/users" element={<h1>Users</h1>}/>
                    <Route path="/products" element={<AdminProductPage/>}/>
                    <Route path="/addProduct" element={<AddProductPage/>}/>
                    <Route path="/editProduct" element={<EditProductPage/>}/>
                    <Route path="/adminOrders" element={<AdminOrdersPage/>}/>

                    
                </Routes>
            </div>
            
        </div>
    )
}