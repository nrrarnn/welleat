import { useState } from "react";
import SideBar from "./SideBar";
import HeaderNav from "./HeaderNav";
import DashboardHome from "./dashboardHome/DashboardHome";
import ManajemenRecipes from "./manajemenRecipes/ManajemenRecipes";
import Users from "./users/Users";

const DashboardPage = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);


  const handleExpandedSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <DashboardHome />;
      case 'Manajemen Recipes':
        return <ManajemenRecipes/>;
      case 'User':
        return <Users/>;
      default:
        return <DashboardHome />;
    }
  };

  return (
   <>
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 h-full">
        <SideBar setActivePage={setActivePage} activePage={activePage} isSidebarExpanded={isSidebarExpanded} />
      </div>
      <div className={`flex-1 flex flex-col ${isSidebarExpanded ? 'ml-60' : 'ml-16'}`}>
        <HeaderNav handleExpandedSidebar={handleExpandedSidebar} />
        <div className="flex-1">
            {renderPage()}
        </div>
      </div>
    </div>
   </>
  );
};

export default DashboardPage;
