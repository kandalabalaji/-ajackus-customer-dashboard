import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

type Page = 'home' | 'dashboard' | '404';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigateToDashboard={() => navigateToPage('dashboard')} />;
      case 'dashboard':
        return <Dashboard />;
      case '404':
        return <NotFound onNavigateHome={() => navigateToPage('home')} />;
      default:
        return <NotFound onNavigateHome={() => navigateToPage('home')} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;