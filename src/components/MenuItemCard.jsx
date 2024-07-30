import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const MenuItemCard = ({ item, onAddToCart }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>${item.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{item.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAddToCart(item)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
