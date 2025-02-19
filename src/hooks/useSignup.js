import toast from 'react-hot-toast';
import useAxiosPublic from './useAxiosPublic';

const useSignup = (
    setLoading, 
    createUser, 
    updateUserProfile, 
    logOut, 
    navigate
) => {
    const axiosPublic = useAxiosPublic();
    
    const onSubmit = async (data) => {
        if(!data) return;
        try {
            setLoading(true);
            await createUser(data.email, data.password)
            await updateUserProfile(data.name, data.photoURL)
            
            const userInfo = {
                name: data.name,
                email: data.email
            };
            
            const response = await axiosPublic.post('/users', userInfo)
            console.log(response)
            if(response.data.insertedId) {
                toast.success('User Signed Up!', {
                    duration: 4000
                });
                await logOut()
                setTimeout(() => navigate('/login'), 1000);        
            }
        } catch (error) {
            console.error('error in signup', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return onSubmit;
};

export default useSignup;