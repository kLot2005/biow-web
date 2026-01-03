import React, { useState, useMemo } from 'react';
import { format, parse, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, LogOut, User } from 'lucide-react';
import BiorhythmChart from '../components/BiorhythmChart';
import { generateMultipleMonthsData } from '../utils/biorhythms';

const DashboardPage = ({ onLogout }) => {
  const [birthDate, setBirthDate] = useState('1973-03-16');
  const [name, setName] = useState('');
  const [targetMonth, setTargetMonth] = useState(new Date());
  const [numberOfMonths, setNumberOfMonths] = useState(3);

  const monthsData = useMemo(() => {
    // Parse the birth date string as a local date (yyyy-MM-dd) to avoid UTC offsets
    const parsedBirthDate = parse(birthDate, 'yyyy-MM-dd', new Date());
    return generateMultipleMonthsData(parsedBirthDate, targetMonth, numberOfMonths);
  }, [birthDate, targetMonth, numberOfMonths]);

  const handlePrevMonth = () => setTargetMonth(subMonths(targetMonth, 1));
  const handleNextMonth = () => setTargetMonth(addMonths(targetMonth, 1));

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col items-center relative z-10">
      <header className="mb-8 sm:mb-12 text-center animate-fade-in-up relative w-full">
        <button
          onClick={onLogout}
          className="absolute top-0 right-0 px-4 py-2 bg-white/40 backdrop-blur-sm hover:bg-white/60 rounded-xl text-sm font-semibold text-gray-700 transition-all shadow-sm border border-white/40 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" strokeWidth={2.5} />
          Выход
        </button>
        <div className="inline-block mb-3 px-4 py-1.5 bg-white/30 backdrop-blur-sm rounded-full border border-white/40">
          <p className="text-xs font-semibold text-gray-700 tracking-wider uppercase">PRO версия</p>
        </div>
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight text-white mb-3 drop-shadow-lg">
          Биоритмы
        </h1>
        <div className="w-24 h-1 bg-white/40 mx-auto rounded-full"></div>
      </header>

      <div className="w-full max-w-7xl space-y-6 sm:space-y-8">
        {/* Controls Card */}
        <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-end justify-between animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

          <div className="flex flex-col md:flex-row gap-6 flex-1 w-full">
            {/* Name Input */}
            <div className="flex items-end gap-4 flex-1">
              <div className="p-4 bg-gradient-to-br from-white/80 to-white/60 rounded-2xl shadow-lg border border-white/50 h-14 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">ФИО</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-3 text-lg font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all shadow-sm h-14 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="flex items-end gap-4 flex-1">
              <div className="p-4 bg-gradient-to-br from-white/80 to-white/60 rounded-2xl shadow-lg border border-white/50 h-14 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-600" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Дата рождения</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-3 text-lg font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all shadow-sm h-14"
                />
              </div>
            </div>
          </div>

          <div className="flex items-end gap-4 lg:gap-6 justify-center lg:justify-end">
            <button
              onClick={handlePrevMonth}
              className="p-3.5 bg-white/60 hover:bg-white/80 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border border-white/40 flex-shrink-0 h-14 flex items-center justify-center"
              aria-label="Предыдущий месяц"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" strokeWidth={2.5} />
            </button>

            <div className="text-center min-w-[180px] px-4 py-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/40 h-14 flex flex-col justify-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5 leading-tight">Начальный период</div>
              <div className="text-lg font-bold text-gray-800 capitalize leading-tight">
                {format(targetMonth, 'LLLL yyyy')}
              </div>
            </div>

            <div className="flex items-center gap-2 h-14 px-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/40">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap">Месяцев:</label>
              <select
                value={numberOfMonths}
                onChange={(e) => setNumberOfMonths(Number(e.target.value))}
                className="bg-transparent border-none outline-none text-sm font-bold text-gray-700 cursor-pointer appearance-none"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-3.5 bg-white/60 hover:bg-white/80 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border border-white/40 flex-shrink-0 h-14 flex items-center justify-center"
              aria-label="Следующий месяц"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 py-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 shadow-sm">
            <span className="w-4 h-4 rounded-full bg-[#ff2d55] shadow-md ring-2 ring-white/50"></span>
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Физический</span>
            <span className="text-xs font-medium text-gray-500">(23 дн.)</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 shadow-sm">
            <span className="w-4 h-4 rounded-full bg-[#00e676] shadow-md ring-2 ring-white/50"></span>
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Эмоциональный</span>
            <span className="text-xs font-medium text-gray-500">(28 дн.)</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 shadow-sm">
            <span className="w-4 h-4 rounded-full bg-[#2979ff] shadow-md ring-2 ring-white/50"></span>
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Интеллектуальный</span>
            <span className="text-xs font-medium text-gray-500">(33 дн.)</span>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {monthsData.map((monthData, index) => (
            <BiorhythmChart
              key={`month-${index}`}
              data={monthData.data}
              monthName={monthData.monthName}
              userName={name}
            />
          ))}
        </div>

        {/* Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="glass-card p-6 sm:p-7 rounded-2xl sm:rounded-3xl border-t-4 border-t-[#ff2d55] hover:border-t-[#ff1744] transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff2d55]/20 to-[#ff2d55]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Физическое состояние</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Влияет на выносливость, энергию и общее состояние здоровья. Важно для спортивных нагрузок и физического труда.
            </p>
          </div>
          <div className="glass-card p-6 sm:p-7 rounded-2xl sm:rounded-3xl border-t-4 border-t-[#00e676] hover:border-t-[#00c853] transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00e676]/20 to-[#00e676]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Эмоциональный фон</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Отвечает за настроение, чувствительность и творческие способности. Влияет на общение и стрессоустойчивость.
            </p>
          </div>
          <div className="glass-card p-6 sm:p-7 rounded-2xl sm:rounded-3xl border-t-4 border-t-[#2979ff] hover:border-t-[#2962ff] transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2979ff]/20 to-[#2979ff]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Интеллект</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Способность к обучению, память, аналитическое мышление и концентрация внимания.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
