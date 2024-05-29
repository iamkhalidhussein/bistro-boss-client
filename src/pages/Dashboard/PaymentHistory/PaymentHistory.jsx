import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            console.log(user.email)
            const res = await axiosSecure.get(`/payments/${user.email}`)
            console.log(res.data)
            return res.data;
        }
    })

    return (
        <div>
            <h2 className="text-3xl">Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Price</th>
                        <th>Transaction ID</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map((payment, idx) => <tr key={payment._id}>
                        <th>{idx + 1}</th>
                        <td>${payment.price}</td>
                        <td>{payment.transactionId}</td>
                        <td>{payment.status}</td>
                    </tr>)}
                    </tbody>
                </table>
                </div>
        </div>
    );
};

export default PaymentHistory;