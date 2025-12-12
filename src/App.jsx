import React, { useState, useMemo } from 'react';
import { format, parse, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import BiorhythmChart from './components/BiorhythmChart';
import { generateMonthData } from './utils/biorhythms';

function App() {
  const [birthDate, setBirthDate] = useState('1973-03-16');
  const [targetMonth, setTargetMonth] = useState(new Date());

  const data = useMemo(() => {
    return generateMonthData(new Date(birthDate), targetMonth);
  }, [birthDate, targetMonth]);

  const handlePrevMonth = () => setTargetMonth(subMonths(targetMonth, 1));
  const handleNextMonth = () => setTargetMonth(addMonths(targetMonth, 1));

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-thin tracking-widest text-[#1f2937] mb-2 uppercase">Биоритмы</h1>
        <p className="text-gray-500 font-light tracking-widest uppercase text-sm">PRO версия</p>
      </header>

      <div className="w-full max-w-6xl space-y-8">
        {/* Controls Card */}
        <div className="glass rounded-3xl p-6 flex flex-wrap gap-8 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Calendar className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Дата рождения</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-transparent text-xl font-medium outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handlePrevMonth}
              className="p-3 hover:bg-white/50 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="text-center w-48">
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Текущий период</div>
              <div className="text-xl font-medium text-gray-700 capitalize">
                {format(targetMonth, 'LLLL yyyy')}
              </div>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-3 hover:bg-white/50 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 py-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff2d55]"></span>
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Физический (23)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#00e676]"></span>
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Эмоциональный (28)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2979ff]"></span>
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Интеллектуальный (33)</span>
          </div>
        </div>

        {/* Chart */}
        <BiorhythmChart data={data} />

        {/* Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-3xl border-t-8 border-t-[#ff2d55]">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Физическое состояние</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Влияет на выносливость, энергию и общее состояние здоровья. Важно для спортивных нагрузок и физического труда.
            </p>
          </div>
          <div className="glass p-6 rounded-3xl border-t-8 border-t-[#00e676]">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Эмоциональный фон</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Отвечает за настроение, чувствительность и творческие способности. Влияет на общение и стрессоустойчивость.
            </p>
          </div>
          <div className="glass p-6 rounded-3xl border-t-8 border-t-[#2979ff]">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Интеллект</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Способность к обучению, память, аналитическое мышление и концентрация внимания.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
