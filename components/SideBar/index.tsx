// Importing Logo and Menu components
import Logo from "./Logo";
import Menu from "./Menu";

// Sidebar component
function SideBar() {
  // Rendering sidebar layout
  return (
    <div className="w-60 h-full bg-sidebarBackground overflow-y-scroll no-scrollbar">
      <Logo /> {/* Rendering Logo component */}
      <Menu/> {/* Rendering Menu component */}
    </div>
  );
}

export default SideBar; // Exporting Sidebar component
