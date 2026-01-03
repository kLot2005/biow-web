import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { useId, useMemo } from 'react';

const BiorhythmChart = ({ data, monthName, userName }) => {
    const chartId = useId().replace(/:/g, '-');

    // 1. Предварительная обработка данных для логики Бара (Столбцов)
    const processedData = useMemo(() => {
        return data.map((item, index) => {
            // Shift +1 day to align with curves (Visual fix for observed 1-day lag/shift)
            // If we are at the last item, we fallback to the current item or handle gracefully
            const targetItem = data[index + 1] || item;

            const values = [targetItem.physical, targetItem.emotional, targetItem.intellectual];
            const positiveCount = values.filter((v) => v > 0).length;
            const negativeCount = values.filter((v) => v < 0).length;

            let barValue = 0;
            let barColor = '#e0e0e0'; // Цвет по умолчанию (нейтральный)

            // Логика, которую вы описали:
            if (positiveCount === 3) {
                // 3 значения > 0: Ярко-зеленый и длинный
                barValue = 80;
                barColor = '#69f0ae';
            } else if (positiveCount === 2) {
                // 2 значения > 0: Просто зеленый и поменьше
                barValue = 30;
                barColor = '#2e7d32';
            } else if (negativeCount === 3) {
                // 3 значения < 0: Очень красный и длинный вниз
                barValue = -80;
                barColor = '#ff5252';
            } else if (negativeCount === 2) {
                // 2 значения < 0: Просто красный и поменьше вниз
                barValue = -30;
                barColor = '#c62828';
            } else {
                // Оставшийся вариант (например 1 плюс и 1 минус, смешанное)
                // Можно сделать маленьким серым или не рисовать
                barValue = 10;
                barColor = 'rgba(0,0,0,0.1)';
            }

            return {
                ...item,
                barValue, // Новое поле для высоты столбца
                barColor  // Новое поле для цвета
            };
        });
    }, [data]);

    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i) => Math.max(i.physical, i.emotional, i.intellectual)));
        const dataMin = Math.min(...data.map((i) => Math.min(i.physical, i.emotional, i.intellectual)));

        if (dataMax <= 0) return 0;
        if (dataMin >= 0) return 1;
        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    return (
        <div className="w-full h-96 glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative ">
            {monthName && (
                <div className="absolute top-4 left-6 z-10">
                    <h3 className="text-lg font-bold text-gray-800 capitalize">
                        {monthName} {userName && <span className="text-gray-500 font-medium ml-2">- {userName}</span>}
                    </h3>
                </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={processedData} // Используем обработанные данные
                    margin={{ top: 45, right: 30, left: 0, bottom: 0 }}
                    barCategoryGap={0}
                    barGap={0}
                >
                    <defs>
                        <linearGradient id={`splitColorPhysical-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="#ff2d55" stopOpacity={0.6} />
                            <stop offset={off} stopColor="#ff2d55" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id={`splitColorEmotional-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="#00e676" stopOpacity={0.6} />
                            <stop offset={off} stopColor="#00e676" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id={`splitColorIntellectual-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="#2979ff" stopOpacity={0.6} />
                            <stop offset={off} stopColor="#2979ff" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.08)" />
                    <XAxis
                        dataKey="formattedDate"
                        tick={{ fontSize: 12, fill: '#4b5563', fontWeight: 500 }}
                        interval={0}
                        stroke="#9ca3af"
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis domain={[-100, 100]} hide />

                    {/* Тултип нужно немного настроить, чтобы он не показывал техническое поле barValue пользователю, если не нужно */}
                    <Tooltip
                        contentStyle={{
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.5)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(10px)'
                        }}
                        labelStyle={{ fontWeight: 600, color: '#374151' }}
                        itemStyle={{ fontWeight: 500 }}
                        // Фильтруем, чтобы не показывать barValue в подсказке, если это не требуется
                        formatter={(value, name) => {
                            if (name === 'barValue') return [null, null]; // Скрываем из тултипа
                            return [value, name === 'physical' ? 'Физический' : name === 'emotional' ? 'Эмоциональный' : 'Интеллектуальный'];
                        }}
                    />
                    <ReferenceLine y={0} stroke="#6b7280" strokeOpacity={0.3} strokeWidth={2} strokeDasharray="5 5" />

                    {/* 2. Обновленный Bar компонент */}
                    <Bar
                        dataKey="barValue"
                        opacity={0.85}
                        barSize={30}
                        radius={[4, 4, 0, 0]}
                    >
                        {processedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.barColor} stroke={entry.barColor} />
                        ))}
                    </Bar>

                    <Area
                        type="monotone"
                        dataKey="physical"
                        stroke="#ff2d55"
                        strokeWidth={3}
                        fill={`url(#splitColorPhysical-${chartId})`}
                        tension={0.4}
                        name="physical"
                    />
                    <Area
                        type="monotone"
                        dataKey="emotional"
                        stroke="#00e676"
                        strokeWidth={3}
                        fill={`url(#splitColorEmotional-${chartId})`}
                        tension={0.4}
                        name="emotional"
                    />
                    <Area
                        type="monotone"
                        dataKey="intellectual"
                        stroke="#2979ff"
                        strokeWidth={3}
                        fill={`url(#splitColorIntellectual-${chartId})`}
                        tension={0.4}
                        name="intellectual"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BiorhythmChart;