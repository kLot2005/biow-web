import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const AUTH_KEY = 'biow_authenticated';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверка авторизации при загрузке
  useEffect(() => {
    try {
      const authStatus = localStorage.getItem(AUTH_KEY);
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Ошибка доступа к localStorage:', error);
    }
  }, []);

  const handleLogin = () => {
    try {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Ошибка сохранения авторизации:', error);
      setIsAuthenticated(true); // Все равно устанавливаем, даже если localStorage не работает
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error('Ошибка удаления авторизации:', error);
    }
  };

  // Роутинг между страницами
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <DashboardPage onLogout={handleLogout} />;
}

export default App;
