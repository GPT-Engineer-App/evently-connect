import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MyTickets = () => {
  const tickets = [
    { id: 1, eventName: 'Summer Music Festival', date: '2024-07-15', status: 'Active' },
    { id: 2, eventName: 'Tech Conference 2024', date: '2024-09-20', status: 'Active' },
    { id: 3, eventName: 'Comedy Night', date: '2024-05-30', status: 'Used' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader>
              <CardTitle>{ticket.eventName}</CardTitle>
              <CardDescription>Date: {ticket.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Status: {ticket.status}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
