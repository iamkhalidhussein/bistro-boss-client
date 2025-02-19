import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Search, Download, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Mock data for payment history
const mockPayments = [
    {
      id: "ORD001",
      date: "2023-06-15 19:30",
      restaurant: "Burger Palace",
      total: 25.99,
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: "ORD002",
      date: "2023-06-10 13:45",
      restaurant: "Pizza Heaven",
      total: 32.5,
      method: "PayPal",
      status: "Completed",
    },
    {
      id: "ORD003",
      date: "2023-06-05 20:15",
      restaurant: "Sushi Haven",
      total: 45.0,
      method: "Debit Card",
      status: "Refunded",
    },
    {
      id: "ORD004",
      date: "2023-06-01 12:00",
      restaurant: "Taco Town",
      total: 18.75,
      method: "Cash",
      status: "Completed",
    },
    {
      id: "ORD005",
      date: "2023-05-28 18:20",
      restaurant: "Pasta Paradise",
      total: 37.25,
      method: "Credit Card",
      status: "Completed",
    },
];

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    // const {data: payments = []} = useQuery({
    //     queryKey: ['payments', user.email],
    //     queryFn: async () => {
    //         console.log(user.email)
    //         const res = await axiosSecure.get(`/payments/${user.email}`)
    //         console.log(res.data)
    //         return res.data;
    //     }
    // });

    const [payments, setPayments] = useState(mockPayments);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

    const handleSearch = () => {
        console.log('handle serach!');
    };

    const handleSort = () => {
        console.log('handle sort!');
    };

    const getStatusColor = (status) => {
        switch (status) {
        case "Completed":
            return "bg-green-500"
        case "Refunded":
            return "bg-yellow-500"
        case "Pending":
            return "bg-blue-500"
        default:
            return "bg-gray-500"
        }
    };

    return (
        <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Payment History</h1>
            <div className="flex items-center space-x-2">
            <Input
                type="text"
                placeholder="Search by Order ID or Restaurant"
                value={searchTerm}
                onChange={handleSearch}
                className="w-64"
            />
            <Search className="h-5 w-5 text-gray-500" />
            </div>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                    Order ID{" "}
                    {sortConfig.key === "id" &&
                        (sortConfig.direction === "asc" ? (
                        <ChevronUp className="inline h-4 w-4" />
                        ) : (
                        <ChevronDown className="inline h-4 w-4" />
                        ))}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                    Date{" "}
                    {sortConfig.key === "date" &&
                        (sortConfig.direction === "asc" ? (
                        <ChevronUp className="inline h-4 w-4" />
                        ) : (
                        <ChevronDown className="inline h-4 w-4" />
                        ))}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("restaurant")}>
                    Restaurant{" "}
                    {sortConfig.key === "restaurant" &&
                        (sortConfig.direction === "asc" ? (
                        <ChevronUp className="inline h-4 w-4" />
                        ) : (
                        <ChevronDown className="inline h-4 w-4" />
                        ))}
                    </TableHead>
                    <TableHead className="cursor-pointer text-right" onClick={() => handleSort("total")}>
                    Total{" "}
                    {sortConfig.key === "total" &&
                        (sortConfig.direction === "asc" ? (
                        <ChevronUp className="inline h-4 w-4" />
                        ) : (
                        <ChevronDown className="inline h-4 w-4" />
                        ))}
                    </TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {payments.map((payment) => (
                    <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.restaurant}</TableCell>
                    <TableCell className="text-right">${payment.total.toFixed(2)}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                    </TableCell>
                    <TableCell>
                        <div className="flex space-x-2">
                        <Dialog>
                            <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                View Details
                            </Button>
                            </DialogTrigger>
                            <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Order Details - {payment.id}</DialogTitle>
                                <DialogDescription>Details for your order from {payment.restaurant}</DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 space-y-2">
                                <p>
                                <strong>Date:</strong> {payment.date}
                                </p>
                                <p>
                                <strong>Restaurant:</strong> {payment.restaurant}
                                </p>
                                <p>
                                <strong>Total:</strong> ${payment.total.toFixed(2)}
                                </p>
                                <p>
                                <strong>Payment Method:</strong> {payment.method}
                                </p>
                                <p>
                                <strong>Status:</strong> {payment.status}
                                </p>
                            </div>
                            </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" /> Receipt
                        </Button>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    </div>
    );
};

export default PaymentHistory;