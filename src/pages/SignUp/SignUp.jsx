import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import {useForm} from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
    const {register, handleSubmit,  formState: {errors}} = useForm();
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = useSignup(
      setLoading, 
      createUser, 
      updateUserProfile, 
      logOut, 
      navigate
    );

    return (
        <div className='flex'>
            <Toaster/>
            <Helmet>
                <title>Bistro Boss || Sign Up</title>
            </Helmet>
            <SignUpForm
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                loading={loading}
            />
            <HeroSection/>
        </div>
    );
};

export default SignUp;

const HeroSection = () => (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
      </div>
    </div>
  );

  const SignUpForm = ({ register, handleSubmit, onSubmit, errors, loading }) => (
    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <FormInput
          label="Name"
          type="text"
          name="name"
          register={register}
          errors={errors}
          required
        />
        <FormInput
          label="Photo URL"
          type="text"
          name="photoURL"
          register={register}
          errors={errors}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          register={register}
          errors={errors}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          required
        />
        <div className="form-control mt-6">
          <button className="btn btn-primary" type='submit' disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
          </button>
        </div>
      </form>
      <p className="text-center">
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </p>
      <SocialLogin />
    </div>
  );
  
const FormInput = ({ label, type, name, register, errors, required }) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        {...register(name, { required })}
        placeholder={label}
        className="input input-bordered"
      />
      {errors[name] && <span className="text-red-300">This field is required</span>}
    </div>
  );