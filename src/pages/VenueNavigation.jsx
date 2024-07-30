import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Navigation, Wifi, MapPin } from 'lucide-react';

const VenueNavigation = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Simulating real-time updates
    const updateInterval = setInterval(() => {
      const newUpdate = {
        id: Date.now(),
        message: `Update as of ${new Date().toLocaleTimeString()}: ${getRandomUpdate()}`,
      };
      setUpdates(prevUpdates => [newUpdate, ...prevUpdates.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(updateInterval);
  }, []);

  const getRandomUpdate = () => {
    const updates = [
      "Main hall capacity now at 75%",
      "New food stall opened near Gate C",
      "Next performance starting in 15 minutes",
      "VIP lounge now open for platinum ticket holders",
      "Lost and found items can be claimed at the info desk",
    ];
    return updates[Math.floor(Math.random() * updates.length)];
  };

  const renderMap = () => (
    <div className="relative bg-gray-200 h-96 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">Interactive Venue Map</p>
      </div>
      <div className="absolute top-1/4 left-1/4">
        <MapPin className="text-red-500" />
        <span className="text-xs">Main Stage</span>
      </div>
      <div className="absolute top-1/2 right-1/4">
        <MapPin className="text-blue-500" />
        <span className="text-xs">Food Court</span>
      </div>
      <div className="absolute bottom-1/4 left-1/3">
        <MapPin className="text-green-500" />
        <span className="text-xs">Restrooms</span>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "map":
        return renderMap();
      case "directions":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Directions</h3>
            <p className="mb-2">Current Location: Main Entrance</p>
            <ol className="list-decimal pl-5">
              <li>Walk straight ahead for 50 meters</li>
              <li>Turn right at the information desk</li>
              <li>Take the escalator to the second floor</li>
              <li>Your destination (Main Hall) will be on your left</li>
            </ol>
          </div>
        );
      case "indoor-nav":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Indoor Navigation</h3>
            <p className="mb-2">Enable your device's Bluetooth for precise indoor navigation.</p>
            <Button className="mb-2">Start Navigation</Button>
            <p>Nearby Points of Interest:</p>
            <ul className="list-disc pl-5">
              <li>Restrooms - 20m ahead</li>
              <li>Food Court - 50m to your right</li>
              <li>VIP Lounge - 100m, take the elevator to 3rd floor</li>
            </ul>
          </div>
        );
      case "updates":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
            {updates.map(update => (
              <div key={update.id} className="mb-2 p-2 bg-gray-100 rounded">
                {update.message}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Venue Navigation</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="directions">Directions</TabsTrigger>
          <TabsTrigger value="indoor-nav">Indoor Nav</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VenueNavigation;
