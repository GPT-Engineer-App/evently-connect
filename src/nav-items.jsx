import { Home, Beer, Map } from "lucide-react";
import Index from "./pages/Index.jsx";
import BarMenu from "./pages/BarMenu.jsx";
import VenueNavigation from "./pages/VenueNavigation.jsx";

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
];
