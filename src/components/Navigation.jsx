import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { navItems } from '../nav-items';
import { toast } from "sonner";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const filteredNavItems = navItems.filter(item => {
    if (item.private && !user) return false;
    if (item.role && (!user || user.role !== item.role)) return false;
    return true;
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className={`bg-gray-800 text-white w-64 min-h-screen ${isOpen ? 'block' : 'hidden'} md:block`}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">EventXperience</h1>
        <ul>
          {filteredNavItems.map((item) => (
            <li key={item.to} className="mb-2">
              <Link
                to={item.to}
                className={`flex items-center p-2 rounded hover:bg-gray-700 ${
                  location.pathname === item.to ? 'bg-gray-700' : ''
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        {user ? (
          <Button onClick={handleLogout} className="mt-4 w-full">Logout</Button>
        ) : (
          <Link to="/login">
            <Button className="mt-4 w-full">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
