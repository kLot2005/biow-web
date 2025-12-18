import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const PASSWORD = 'biow2024'; // Зашитый пароль

const LoginPage = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Имитация небольшой задержки для UX
    setTimeout(() => {
      if (password === PASSWORD) {
        onLogin();
      } else {
        setError('Неверный пароль');
        setPassword('');
      }
      setIsLoading(false);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="glass rounded-3xl p-8 sm:p-12 max-w-md w-full shadow-2xl animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-block mb-4 p-4 bg-gradient-to-br from-white/80 to-white/60 rounded-2xl shadow-lg border border-white/50">
            <Lock className="w-10 h-10 text-gray-600" strokeWidth={2} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-gray-800 mb-3">
            Биоритмы
          </h1>
          <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full mb-2"></div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            PRO версия
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              className="w-full bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl px-5 py-4 text-lg font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all shadow-sm"
              placeholder="Введите пароль"
              autoFocus
              disabled={isLoading}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
          >
            {isLoading ? 'Проверка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


