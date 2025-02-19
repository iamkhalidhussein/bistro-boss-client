import toast from "react-hot-toast";

const useLogin = (from, signIn, navigate, setLoading) => {
    
    const handleLogin = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();
            const form = e.target;
            const email = form.email.value;
            const password = form.password.value;
            console.log(email, password)
            
            await signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                toast.success('Login Successfull');
                setTimeout(() => {
                    navigate(from, {replace: true});
                }, 600);
            })
        } catch (error) {
            console.error('error in login', error);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return handleLogin;
};

export default useLogin;