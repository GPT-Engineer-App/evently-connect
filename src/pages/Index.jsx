import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar as CalendarIcon, Plus } from "lucide-react";
import EventDetails from '@/components/EventDetails';
import { format } from "date-fns";
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userRoles, setUserRoles] = useState(['eventAttendee', 'barCustomer', 'eventOrganizer']); // This should be fetched from a user context or API
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // In a real application, this would be an API call
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(storedEvents);
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Discover Events</h1>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button variant="outline" className="w-10 h-10 p-0">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="w-10 h-10 p-0">
          <CalendarIcon className="h-4 w-4" />
        </Button>
        {userRoles.includes('eventOrganizer') && (
          <Link to="/event-management">
            <Button variant="outline" className="w-10 h-10 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {selectedEvent ? (
        <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Date: {format(new Date(event.date), "PPP")}</p>
                <p>Ticket Price: ${event.ticketPrice}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedEvent(event)}>View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
