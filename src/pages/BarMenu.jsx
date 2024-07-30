import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from 'lucide-react';
import MenuItemCard from '@/components/MenuItemCard';
import Cart from '@/components/Cart';

const BarMenu = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const menuItems = [
    { id: 1, name: "Beer", price: 5, description: "Cold and refreshing" },
    { id: 2, name: "Wine", price: 8, description: "Red or white" },
    { id: 3, name: "Cocktail", price: 10, description: "Bartender's choice" },
    { id: 4, name: "Soda", price: 3, description: "Various flavors" },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const placeOrder = () => {
    console.log("Order placed:", cart);
    // Here you would typically send the order to a backend
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Bar Menu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {menuItems.map(item => (
          <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
        ))}
      </div>

      <Button 
        className="fixed bottom-4 right-4 z-10"
        onClick={() => setShowCart(true)}
      >
        <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({cart.length})
      </Button>

      {showCart && (
        <Cart 
          items={cart} 
          onClose={() => setShowCart(false)} 
          onRemove={removeFromCart}
          onPlaceOrder={placeOrder}
        />
      )}
    </div>
  );
};

export default BarMenu;
