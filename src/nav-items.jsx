import { Home, Beer, Map, MessageSquare, User, Calendar } from "lucide-react";
import Index from "./pages/Index.jsx";
import BarMenu from "./pages/BarMenu.jsx";
import VenueNavigation from "./pages/VenueNavigation.jsx";
import Feedback from "./pages/Feedback.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import EventManagement from "./pages/EventManagement.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Event Management",
    to: "/event-management",
    icon: <Calendar className="h-4 w-4" />,
    page: <EventManagement />,
  },
  {
    title: "Bar Menu",
    to: "/bar-menu",
    icon: <Beer className="h-4 w-4" />,
    page: <BarMenu />,
  },
  {
    title: "Venue Navigation",
    to: "/venue-navigation",
    icon: <Map className="h-4 w-4" />,
    page: <VenueNavigation />,
  },
  {
    title: "Feedback",
    to: "/feedback",
    icon: <MessageSquare className="h-4 w-4" />,
    page: <Feedback />,
  },
  {
    title: "Account",
    to: "/account",
    icon: <User className="h-4 w-4" />,
    page: <AccountSettings />,
  },
];
