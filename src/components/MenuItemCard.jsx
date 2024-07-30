import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MenuItemCard = ({ item, onAddToCart }) => {
  const [selectedCustomization, setSelectedCustomization] = useState(item.customization[0]);

  const handleAddToCart = () => {
    onAddToCart({ ...item, customization: selectedCustomization });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>${item.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{item.description}</p>
        <Select onValueChange={setSelectedCustomization} defaultValue={selectedCustomization}>
          <SelectTrigger>
            <SelectValue placeholder="Select customization" />
          </SelectTrigger>
          <SelectContent>
            {item.customization.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
