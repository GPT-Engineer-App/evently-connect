import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from 'lucide-react';

const Cart = ({ items, onClose, onRemove, onPlaceOrder }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Your Cart
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div>
                  <span>{item.name} - ${item.price}</span>
                  <br />
                  <small className="text-muted-foreground">{item.customization}</small>
                </div>
                <Button variant="destructive" size="sm" onClick={() => onRemove(index)}>Remove</Button>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between">
          <CardDescription>Total: ${total}</CardDescription>
          <Button onClick={onPlaceOrder} disabled={items.length === 0}>Place Order</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cart;
