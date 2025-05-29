import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        const { firstName, lastName, email, password, confirmPassword, phone } = formData;

        // Basic required field validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !phone) {
        toast.error("Please fill in all fields");
        return;
        }
        

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone
        };
        

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", payload)
            .then((response) => {
                toast.success("Registration successful");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Registration failed", error.response?.data);
                toast.error(error.response?.data?.message || "Registration failed");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] py-6 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col justify-center items-center">
                    <input
                        name="firstName"
                        onChange={handleChange}
                        className="w-[400px] h-[50px] rounded-xl border border-white text-black text-center m-[5px]"
                        placeholder="First Name"
                        type="text"
                        required
                    />
                    <input
                        name="lastName"
                        onChange={handleChange}
                        className="w-[400px] h-[50px] rounded-xl border border-white text-black text-center m-[5px]"
                        placeholder="Last Name"
                        type="text"
                        required
                    />
                    <input
                        name="email"
                        onChange={handleChange}
                        className="w-[400px] h-[50px] rounded-xl border border-white text-black text-center m-[5px]"
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <input
                        name="phone"
                        onChange={handleChange}
                        className="w-[400px] h-[50px] rounded-xl border border-white text-black text-center m-[5px]"
                        placeholder="Phone"
                        type="text"
                        required
                    />
                    <input
                        name="password"
                        onChange={handleChange}
                        className="w-[400px] h-[50px] rounded-xl border border-white text-black text-center m-[5px]"
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <input
                        name="confirmPassword"
                        onChange={handleChange}
                        className="w-[400px] h-[50px] rounded-xl border border-white text-black text-center m-[5px]"
                        placeholder="Confirm Password"
                        type="password"
                        required
                    />
                    <button
                        onClick={handleRegister}
                        className="w-[400px] h-[50px] rounded-xl bg-blue-500 text-white cursor-pointer hover:bg-blue-600 mt-2"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <p className="m-2">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:text-blue-700">
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
            <div className="w-[50%] h-full">
                {/* Optional right-side visual content */}
            </div>
        </div>
    );
}

