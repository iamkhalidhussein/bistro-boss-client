import useAuth from "../../../hooks/useAuth";
import { User, ShoppingBag, Star, CreditCard, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// This would typically come from a database or API
const mockUser = {
    name: "John Doe",
    points: 250,
    credits: 15.0,
  };
  
  const mockRecentOrders = [
    { id: 1, restaurant: "Burger Palace", total: 25.99, date: "2023-06-15" },
    { id: 2, restaurant: "Pizza Heaven", total: 32.5, date: "2023-06-10" },
  ];
  
  const mockFavorites = [
    { id: 1, name: "Burger Palace", type: "restaurant" },
    { id: 2, name: "Margherita Pizza", type: "dish" },
  ];
  

const UserHome = () => {
    const { user } = useAuth();
    
    return (
        <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Welcome back, {user.displayName}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
            <CardHeader>
                <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4">
                <User className="h-10 w-10 text-primary" />
                <div>
                    <p className="text-sm text-muted-foreground">Reward Points</p>
                    <p className="text-2xl font-bold">{mockUser.points}</p>
                </div>
                </div>
                <div className="mt-4 flex items-center space-x-4">
                <CreditCard className="h-10 w-10 text-primary" />
                <div>
                    <p className="text-sm text-muted-foreground">Account Credits</p>
                    <p className="text-2xl font-bold">${mockUser.credits.toFixed(2)}</p>
                </div>
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                {mockRecentOrders.map((order) => (
                    <li key={order.id} className="flex justify-between items-center">
                    <div>
                        <p className="font-medium">{order.restaurant}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <p className="font-bold">${order.total.toFixed(2)}</p>
                    </li>
                ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                View All Orders <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle>Favorites</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                {mockFavorites.map((favorite) => (
                    <li key={favorite.id} className="flex items-center space-x-4">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <div>
                        <p className="font-medium">{favorite.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{favorite.type}</p>
                    </div>
                    </li>
                ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                Manage Favorites <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
            </Card>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions for easy access</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
            <Button>
                <ShoppingBag className="mr-2 h-4 w-4" /> Start New Order
            </Button>
            <Button variant="secondary">Track Current Order</Button>
            <Button variant="secondary">View Recommendations</Button>
            <Button variant="secondary">Manage Payment Methods</Button>
            </CardContent>
        </Card>
    </div>
    );
};

export default UserHome;