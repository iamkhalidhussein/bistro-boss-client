import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import {useLocation, useNavigate} from 'react-router-dom';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
// import axios from 'axios'

const FoodCard = ({item}) => {
    const {name, image, price, recipe, _id} = item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = (food) => {
        if(user && user.email) {
            //TODO: sent cart item to the database
            console.log(user.email, food);
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('http://localhost:5000/carts', cartItem)
            .then((result) => {
                console.log(result.data)
                if(result.data.insertedId) {
                    Swal.fire({
                        title: `${name} added to your cart`,
                        text: "check your cart list",
                        icon: "success"
                    });
                    //refetch cart to update the cart items count
                    refetch();
                }
            })
        }
        else{
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the card!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
                }).then((result) => {
                    if (result.isConfirmed) {
                    // Swal.fire({
                    //     title: "Deleted!",
                    //     text: "Your file has been deleted.",
                    //     icon: "success"
                    // });
                    navigate('/login', {state: {from: location}});
                    }
                });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={image} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{recipe}</p>
            <p className="bg-slate-900 text-white absolute right-0 mr-3 p-1">${price}</p>
            <div className="card-actions justify-end">
            <button onClick={() => handleAddToCart(item)} className="btn btn-primary">Add to Cart</button>
            </div>
        </div>
        </div>
    );
};

export default FoodCard;