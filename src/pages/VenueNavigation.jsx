import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Navigation, Wifi } from 'lucide-react';

const VenueNavigation = () => {
  const [activeTab, setActiveTab] = useState("map");

  const renderContent = () => {
    switch (activeTab) {
      case "map":
        return (
          <div className="bg-gray-200 h-64 flex items-center justify-center">
            <p>Venue Map Placeholder</p>
          </div>
        );
      case "directions":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Directions</h3>
            <p>1. Enter the main entrance</p>
            <p>2. Turn right at the information desk</p>
            <p>3. Follow the signs to your destination</p>
          </div>
        );
      case "indoor-nav":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Indoor Navigation</h3>
            <p>Indoor navigation feature coming soon!</p>
          </div>
        );
      case "updates":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
            <ul className="list-disc pl-5">
              <li>Main hall is currently at 50% capacity</li>
              <li>Restrooms near Gate B are under maintenance</li>
              <li>Food court will open in 30 minutes</li>
            </ul>
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
