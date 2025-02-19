import toast from 'react-hot-toast';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useClearCart = (refetch) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const clearCart = async () => {
        try {
          const res = await axiosSecure.delete(`/carts/clear-carts/${user?.email}`)
          if(res.data.deletedCount > 0) {
            refetch();
            toast.success('carts cleared successfully', {
              duration: 4000
            });
          }
        } catch (error) {
          console.error('error in clear carts', error);
        }
      };
      
    return clearCart;
};

export default useClearCart;