import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const formData = new FormData();
        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
            console.log(data.image[0]);  // Debug: Check if the file is captured
        } else {
            console.error('No file selected');
            return;
        }

        try {
            const response = await axios.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(response.data.success) {
                //now send the menu item to the server with the image url
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: response.data.data.display_url
                }
                //
                const menuRes = await axiosSecure.post('/menu', menuItem)
                console.log(menuRes.data);
                if(menuRes.data.insertedId) {
                    //show success popup
                    reset();
                    Swal.fire({
                        title: "Success!",
                        text: `${data.name} is added to the menu`,
                        icon: "success"
                    });
                }
            }
            console.log(response.data);
        } catch (error) {
            console.error('Image upload failed', error);
        }
    };

    return (
        <div>
            <SectionTitle heading="Add an item" subHeading="What's new"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input type="text" placeholder="Recipe Name" {...register('name', { required: true })} className="input input-bordered w-full" required />
                    </label>

                    <div className="flex gap-6">
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue="default" {...register('category', { required: true })} className="select select-bordered w-full" required>
                                <option disabled value="default">Select a Category?</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>
                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input type="number" placeholder="Price" {...register('price', { required: true })} className="input input-bordered w-full" required />
                        </label>
                    </div>
                    {/* recipe details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea {...register('recipe', { required: true })} className="textarea textarea-bordered h-24" placeholder="Details" required></textarea>
                    </label>
                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" required />
                    </div>
                    <button className="btn cursor-pointer bg-primary text-white border-0" type="submit">Add Item <FaUtensils /></button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
