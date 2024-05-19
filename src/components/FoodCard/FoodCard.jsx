
const FoodCard = ({item}) => {
    const {name, image, price, recipe} = item;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={image} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{recipe}</p>
            <p className="bg-slate-900 text-white absolute right-0 mr-3 p-1">${price}</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary">Add to Cart</button>
            </div>
        </div>
        </div>
    );
};

export default FoodCard;