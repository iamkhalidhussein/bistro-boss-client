import useCart from "../../../../hooks/useCart";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from 'react-hot-toast';
import useRemoveItem from "../../../../hooks/useRemoveItem";
import useClearCart from "../../../../hooks/useClearCart";
import useUpdateQuantity from "../../../../hooks/useUpdateQuantity";


const Cart = () => {
    const [carts, refetch] = useCart();
    const [deletingCart, setDeletingCart] = useState(false);
    const [cartItems, setCartItems] = useState(carts);

    useEffect(() => {
      setCartItems(carts);
    }, [carts, cartItems]);

    const updateQuantity = useUpdateQuantity(setCartItems);

    const removeItem = useRemoveItem(setDeletingCart, refetch);
    const clearCart = useClearCart(refetch);
  
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const tax = totalPrice * 0.1;
    const total = totalPrice + tax;

    return (
        <div className="p-6 space-y-6">
        <Toaster/>
        <CartHeader
            cartItems={cartItems}
            clearCart={clearCart}
        />

        {cartItems.length === 0 ? (
          <EmptyCartMessage/>
        ) : (
          <CartItem
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            deletingCart={deletingCart}
          />
        )}

        <CartSummary
          totalPrice={totalPrice}
          cartItems={cartItems}
          tax={tax}
          total={total}
        />
    </div>
    );
};

export default Cart;

const CartHeader = ({ clearCart, cartItems }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">My Cart</h1>
      <Button 
          variant="destructive" 
          onClick={clearCart} 
          disabled={cartItems.length === 0}
        >
        Clear Cart
      </Button>
    </div>
  )
};

const EmptyCartMessage = () => {
  return (
    <Card>
        <CardContent className="pt-6 text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg font-medium">Your cart is empty</p>
          <p className="mt-2 text-sm text-gray-500">Add some delicious items to your cart!</p>
        </CardContent>
    </Card>
  )
};

const CartItem = ({ cartItems, updateQuantity, removeItem, deletingCart }) => {
  return (
    <div className="space-y-4">
        {cartItems.map((item) => (
          <Card key={item._id}>
            <CartItemHeader item={item}/>
            <CartItemContent 
              item={item} 
              updateQuantity={updateQuantity}
            />
            <CartItemFooter 
              item={item} 
              removeItem={removeItem} 
              deletingCart={deletingCart}
            />
          </Card>
        ))}
      </div>
  )
};

const CartItemHeader = ({ item }) => {
  return (
    <CardHeader>
      <img src={item.image} className="w-36"/>
      <CardTitle>{item.name}</CardTitle>
    </CardHeader>
  )
};

const CartItemContent = ({ item, updateQuantity }) => {
  return (
    <CardContent>
      <p className="text-sm text-gray-500">{item.restaurant}</p>
      <div className="mt-2 flex justify-between items-center">
        <p className="font-medium">${item.price.toFixed(2)}</p>
        <div className="flex items-center space-x-2">
          <Button 
              variant="outline" 
              size="icon" 
              onClick={() => updateQuantity(item.menuId, (item.quantity || 1) - 1)}
            >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity || 1}</span>
          <Button 
              variant="outline" 
              size="icon" 
              onClick={() => updateQuantity(item.menuId, (item.quantity || 1) + 1)}
            >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  )
};

const CartItemFooter = ({ removeItem, item, deletingCart }) => {
  return (
    <CardFooter className="flex justify-end">
      <Button
        className={`${deletingCart && 'pointer-events-none'}`}
        variant="destructive" 
        size="sm" 
        onClick={() => removeItem(item._id, item.email)}
        >
        <Trash2 className="mr-2 h-4 w-4" />
        {deletingCart ? <Loader2 className="animate-spin"/> : 'Remove'}
      </Button>
    </CardFooter>
  )
};

const CartSummary = ({ totalPrice, tax, total, cartItems }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <CartSummaryRow label="Subtotal" amount={totalPrice}/>
          <CartSummaryRow label="Tax" amount={tax}/>
          <Separator />
          <CartSummaryRow label="Total" amount={total} isBold/>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" disabled={cartItems.length === 0}>
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  )
};

const CartSummaryRow = ({ label, amount, isBold = false }) => {
  return (
    <div className={`flex justify-between ${isBold && 'font-medium'}`}>
      <span>{label}</span>
      <span>${amount.toFixed(2)}</span>
    </div>
  )
};