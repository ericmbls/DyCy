import { useState, useEffect } from 'react';
import LoginPage from '@features/auth/pages/LoginPage';
import DashboardPage from '@features/dashboard/pages/DashboardPage';
import CultivosPage from '@features/cultivos/pages/CultivosPage';
import CultivoDetallePage from '@features/cultivos/pages/CultivoDetallePage';
import ReportesPage from '@features/reportes/pages/ReportesPage';
import UsuariosPage from '@features/usuarios/pages/UsuariosPage';
import AjustesPage from '@features/ajustes/pages/AjustesPage';
import LandingPage from '@features/landing/pages/LandingPage';
import Sidebar from '@shared/layout/Sidebar';
import Header from '@shared/layout/Header';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole] = useState('admin');
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const pageConfig = {
    dashboard: { component: DashboardPage, title: 'Dashboard', showButton: false },
    cultivos: { component: CultivosPage, title: 'Cultivos', showButton: false },
    cultivoDetalle: { component: CultivoDetallePage, title: 'Detalle del Cultivo', showButton: false },
    reportes: { component: ReportesPage, title: 'Reportes', showButton: false },
    usuarios: { component: UsuariosPage, title: 'Usuarios', showButton: false },
    ajustes: { component: AjustesPage, title: 'Ajustes', showButton: false },
  };

  if (showLanding && !isLoggedIn) {
    return <LandingPage onLoginClick={() => setShowLanding(false)} />;
  }

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} setToken={setToken} />;
  }

  const { component: CurrentPage, title, showButton } = pageConfig[currentPage];

  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setIsSidebarOpen(false);
        }}
        role={userRole}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="main-layout">
        <Header
          title={title}
          showButton={showButton}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <CurrentPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          token={token}
          cultivo={selectedCultivo}
          onOpenCultivo={(cultivo) => {
            setSelectedCultivo(cultivo);
            setCurrentPage('cultivoDetalle');
          }}
        />
      </main>
    </div>
  );
}

export default App;