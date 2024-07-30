import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const AccountSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roles, setRoles] = useState({
    eventAttendee: false,
    barCustomer: false,
    eventOrganizer: false,
    administrator: false,
  });

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setRoles(user.roles || {});
    }
  }, [user]);

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    // Here you would typically send the updated info to a backend
    console.log({ name, email, phone, roles });
    toast.success("Account information updated successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const mockOrders = [
    { id: 1, date: '2024-03-15', total: 25.99, status: 'Completed' },
    { id: 2, date: '2024-03-10', total: 15.50, status: 'Completed' },
    { id: 3, date: '2024-03-05', total: 32.75, status: 'Completed' },
  ];

  const mockRegistrations = [
    { id: 1, event: 'Tech Conference 2024', date: '2024-06-15', status: 'Confirmed' },
    { id: 2, event: 'Music Festival', date: '2024-07-20', status: 'Pending' },
  ];

  if (!user) {
    return <div>Please log in to view your account settings.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Personal Information</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="registrations">Event Registrations</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account details here.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateInfo} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Roles</Label>
                  <div className="space-y-2">
                    {Object.entries(roles).map(([role, checked]) => (
                      <div key={role} className="flex items-center space-x-2">
                        <Checkbox
                          id={role}
                          checked={checked}
                          onCheckedChange={(checked) => setRoles(prev => ({ ...prev, [role]: checked }))}
                        />
                        <Label htmlFor={role}>{role.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button type="submit">Update Information</Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders here.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {mockOrders.map(order => (
                  <li key={order.id} className="border-b pb-2">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registrations">
          <Card>
            <CardHeader>
              <CardTitle>Event Registrations</CardTitle>
              <CardDescription>Manage your event registrations here.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {mockRegistrations.map(reg => (
                  <li key={reg.id} className="border-b pb-2">
                    <p><strong>Event:</strong> {reg.event}</p>
                    <p><strong>Date:</strong> {reg.date}</p>
                    <p><strong>Status:</strong> {reg.status}</p>
                    <Button variant="outline" className="mt-2">View Details</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountSettings;
