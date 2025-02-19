import toast from 'react-hot-toast';
import useAxiosSecure from './useAxiosSecure';

const useRemoveItem = (setDeletingCart, refetch) => {
    const axiosSecure = useAxiosSecure();

    const removeItem = async (id, email) => {
        console.log(id, email);
        try {
          setDeletingCart(true);
          const res = await axiosSecure.delete(`/carts/${id}/${email}`)
          if(res.data.deletedCount > 0) {
            refetch();
          }
        } catch (error) {
          console.error('error in delete cart', error);
          toast.error(error.message);
        } finally {
          setDeletingCart(false);
        }
      };
    return removeItem;
};

export default useRemoveItem;