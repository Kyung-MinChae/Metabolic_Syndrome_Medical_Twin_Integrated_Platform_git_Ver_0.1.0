import { Outlet, Link } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Button } from "@/components/ui/button";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Nav />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
      
      {/* Fixed Simulator Button */}
      <Link to="/simulator">
        <Button className="fixed bottom-6 right-6 rounded-full shadow-lg z-50">
          시뮬레이터 체험하기
        </Button>
      </Link>
    </div>
  );
};

export default Layout;