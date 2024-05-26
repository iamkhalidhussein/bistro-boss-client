import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then((result) => {
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then((res) => {
                console.log(res.data)
                navigate('/');
            })
        })
        .catch((error) => {
            console.log(error.message);
        })
    }
    return ( 
        <div className="mx-10 pb-4">
            <div className="flex flex-col w-full">
        <div className="divider">Or</div>
        </div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;