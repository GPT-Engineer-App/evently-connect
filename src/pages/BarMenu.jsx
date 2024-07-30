import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuItemCard from '@/components/MenuItemCard';
import Cart from '@/components/Cart';
import OrderStatus from '@/components/OrderStatus';
import PaymentModal from '@/components/PaymentModal';
import { toast } from "sonner";

const BarMenu = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const menuCategories = {
    Drinks: [
      { id: 1, name: "Beer", price: 5, description: "Cold and refreshing", customization: ["Regular", "Light", "Dark"] },
      { id: 2, name: "Wine", price: 8, description: "Red or white", customization: ["Red", "White", "Rosé"] },
      { id: 3, name: "Cocktail", price: 10, description: "Bartender's choice", customization: ["Mojito", "Margarita", "Old Fashioned"] },
      { id: 4, name: "Soda", price: 3, description: "Various flavors", customization: ["Cola", "Lemon-Lime", "Orange"] },
    ],
    Food: [
      { id: 5, name: "Nachos", price: 7, description: "Crispy tortilla chips with toppings", customization: ["Cheese", "Guacamole", "Salsa"] },
      { id: 6, name: "Wings", price: 9, description: "Crispy chicken wings", customization: ["BBQ", "Buffalo", "Garlic Parmesan"] },
      { id: 7, name: "Burger", price: 12, description: "Juicy beef patty with toppings", customization: ["Cheese", "Bacon", "Avocado"] },
    ],
    Desserts: [
      { id: 8, name: "Ice Cream", price: 5, description: "Creamy and delicious", customization: ["Vanilla", "Chocolate", "Strawberry"] },
      { id: 9, name: "Brownie", price: 6, description: "Rich chocolate brownie", customization: ["Plain", "With Ice Cream", "With Nuts"] },
    ],
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const placeOrder = () => {
    setShowCart(false);
    setShowPaymentModal(true);
  };

  const processPayment = (paymentDetails) => {
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentModal(false);
      const orderId = Math.floor(Math.random() * 1000000);
      setCurrentOrder({ id: orderId, items: cart, status: 'preparing' });
      setCart([]);
      toast.success(`Order #${orderId} placed successfully!`);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Bar Menu</h1>
      
      <Tabs defaultValue="Drinks" className="mb-6">
        <TabsList>
          {Object.keys(menuCategories).map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(menuCategories).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => (
                <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

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

      {showPaymentModal && (
        <PaymentModal
          total={cart.reduce((sum, item) => sum + item.price, 0)}
          onClose={() => setShowPaymentModal(false)}
          onPayment={processPayment}
        />
      )}

      {currentOrder && (
        <OrderStatus order={currentOrder} />
      )}
    </div>
  );
};

export default BarMenu;
