import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {useForm} from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {
    const {register, handleSubmit,  formState: {errors}} = useForm();
    const {createUser, updateUserProfile, logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log('i am clicking')
        console.log(data);
        createUser(data.email, data.password)
        .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);

            updateUserProfile(data.name, data.photoURL)
            .then(() => {
                console.log('user profile info updated');
                Swal.fire({
                    title: "Success!",
                    text: "User created Successfully.",
                    icon: "success"
                });

                logOut()
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error.message);
                })
                navigate('/login');
            })
            .catch((error) => console.log(error))
        })
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Sign up now!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register('name', {required: true})} placeholder="Name" name="name" className="input input-bordered" />
                    {errors.name && <span className='text-red-300'>This field is required</span>}
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" {...register('photoURL', {required: true})} placeholder="Photo URL" className="input input-bordered" />
                    {errors.photoURL && <span className='text-red-300'>PhotoURL field is required</span>}
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register('email', {required: true})} placeholder="Your Email" name="email" className="input input-bordered"  />
                    {errors.email && <span className='text-red-300'>This field is required</span>}
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register('password', {required: true})}  placeholder="Password" name="password" className="input input-bordered" />
                    {errors.password?.type === 'required' && <span className='text-red-300'>A six characters password is required</span>}
                    {errors.password?.type === 'maxLength' && <span className='text-red-300'>Maximum lenght of password 10</span>}
                    {errors.password?.type === 'password' && <span className='text-red-300'>Password shoule be contain one uppercase and one lowercase and a especial character</span>}
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control mt-6">
                        <input className='btn btn-primary' type="submit" value="Sign Up" />
                    </div>
                </form>
                <p className='text-center'><small>Already have an account? <Link to="/login">Login</Link></small></p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SignUp;