import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const EventDetails = ({ event, onClose }) => {
  const [ticketType, setTicketType] = useState('standard');
  const [quantity, setQuantity] = useState(1);

  const handleRegister = () => {
    // Here you would typically handle the registration process
    console.log(`Registering for ${event.title}`);
    console.log(`Ticket type: ${ticketType}`);
    console.log(`Quantity: ${quantity}`);
    // You could then proceed to payment processing
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.location} - {event.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="ticket-type">Ticket Type</Label>
            <RadioGroup id="ticket-type" value={ticketType} onValueChange={setTicketType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard">Standard ($50)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vip" id="vip" />
                <Label htmlFor="vip">VIP ($100)</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button onClick={handleRegister}>Register</Button>
      </CardFooter>
    </Card>
  );
};

export default EventDetails;
