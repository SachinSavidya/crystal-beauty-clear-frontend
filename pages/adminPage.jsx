import { Link, Route, Routes} from "react-router-dom";
import { FaUsers } from "react-icons/fa";


export default function AdminPage(){
    return(
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="w-[300px] h-full flex-col ">
                <Link to="/admin/users" className="flex p-2 items-center"><FaUsers className="mr-2"/>Users</Link>
                <Link to="/admin/products" className=" p-2">products</Link>

            </div>
            <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg ">
                <Routes path="/*">
                    <Route path="/users" element={<h1>Users</h1>}/>
                    <Route path="/products" element={<h1>Products</h1>}/>
                    
                </Routes>
            </div>
            
        </div>
    )
}