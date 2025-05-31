import { Link } from "react-router-dom"

export default function ProductCard(props){

    const product = props.product

    return(
        <Link to={"/overview/"+product.productId} className="w-[250px] h-[350px] shadow-xl m-4 bg-white rounded-lg">
            <img className="w-full h-[220px] object-cover rounded-t-lg" src={product.images[0]}/>
            <div className="w-full h-[130px] flex justify-center flex-col px-3">
                <p className="text-gray-400">{product.productId}</p>
                <p className="font-bold text-xl">{product.productName}</p>
                <p className="text-lg text-pink-400">Rs.{product.price.toFixed(2)} <span className="text-sm line-through text-gray-500 ">{product.price<product.labeledPrice && product.labeledPrice.toFixed(2)}</span></p>

            </div>


        </Link>
    )
}