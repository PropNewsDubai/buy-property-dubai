import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/Sidebar.jsx';
import PropertyGrid from './components/PropertyGrid.jsx';
import './output.css';

function AppContent() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const lang = location.pathname.split('/')[1] || 'en';
    i18n.changeLanguage(lang);
  }, [location, i18n]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
      <button
        className="sm:hidden p-4 text-gray-600 focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } sm:block fixed top-0 left-0 h-full sm:min-h-screen z-50 sm:z-auto bg-white sm:bg-transparent transition-transform duration-300 sm:transition-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 sm:w-64`} // Added sm:w-64 to ensure consistent width
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="flex-1 sm:ml-64"> {/* Added sm:ml-64 to offset the main content */}
        <PropertyGrid />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/buy-property-dubai">
      <Routes>
        <Route path="/:lang(en|ar|fa|tr|ru|zh)/*" element={<AppContent />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;