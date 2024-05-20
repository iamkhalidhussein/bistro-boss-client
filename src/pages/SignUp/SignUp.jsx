import {useForm} from 'react-hook-form';

const SignUp = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    console.log(watch('example'));

    return (
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
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register('email', {required: true})} placeholder="Your Email" name="email" className="input input-bordered"  />
                    {errors.email && <span className='text-red-300'>This field is required</span>}
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register('password', {required: true, maxLength: 10, pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/})} placeholder="Password" name="password" className="input input-bordered" />
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
                </div>
            </div>
        </div>
    );
};

export default SignUp;