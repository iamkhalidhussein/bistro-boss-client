import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import useCapchaValidation from '../../hooks/useCapchaValidation';
import { Toaster } from 'react-hot-toast';
import useLogin from '../../hooks/useLogin';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const capchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || '/';
    console.log('state in the location', location.state);
    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = useLogin(from, signIn, navigate, setLoading);
    
    const handleValidateCapcha = useCapchaValidation(capchaRef, setDisabled);

    return (
        <div>
            <Toaster/>
            <Helmet>
                <title>Bistro Boss || Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col md:flex-row-reverse">
                <div className="text-center md:w-1/2 lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <LoadCanvasTemplate></LoadCanvasTemplate>
                    </label>
                    <input type="text" name="capcha" ref={capchaRef} placeholder="type the text above" className="input input-bordered" required />
                    <button onClick={handleValidateCapcha} className='btn btn-outline btn-xs'>Validate</button>
                    </div>
                    <div className="form-control mt-6">
                        <button disabled={disabled || loading} type="submit" className="btn btn-primary">{loading ? <Loader2 className='animate-spin'/> : 'Login'}</button>
                    </div>
                </form>
                <p className='text-center'><small>New Here? <Link to="/signup">Create an Account</Link></small></p>
                <SocialLogin/>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;