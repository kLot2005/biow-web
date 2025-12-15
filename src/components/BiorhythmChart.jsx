import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { useId } from 'react';

const BiorhythmChart = ({ data, monthName }) => {
    const chartId = useId().replace(/:/g, '-');
    
    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i) => Math.max(i.physical, i.emotional, i.intellectual)));
        const dataMin = Math.min(...data.map((i) => Math.min(i.physical, i.emotional, i.intellectual)));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    return (
        <div className="w-full h-96 glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative">
            {monthName && (
                <div className="absolute top-4 left-6 z-10">
                    <h3 className="text-lg font-bold text-gray-800 capitalize">{monthName}</h3>
                </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                    />
                    <ReferenceLine y={0} stroke="#6b7280" strokeOpacity={0.3} strokeWidth={2} strokeDasharray="5 5" />

                    <Bar dataKey="integral" opacity={0.85} barSize={30} radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => {
                            const val = entry.integral;
                            let color = '#00e676'; // Default

                            // Logic: 
                            // Excellent (> 40%): Bright Green (Light)
                            // Good (0% - 40%): Dark Green
                            // Bad (-40% - 0%): Dark Red
                            // Very Bad (< -40%): Bright Red (Light)

                            if (val > 40) {
                                color = '#69f0ae'; // Excellent - Lighter/Bright Green
                            } else if (val >= 0) {
                                color = '#2e7d32'; // Good - Darker Green
                            } else if (val > -40) {
                                color = '#c62828'; // Bad - Darker Red
                            } else {
                                color = '#ff5252'; // Very Bad - Lighter/Bright Red
                            }

                            return <Cell key={`cell-${index}`} fill={color} stroke={color} />;
                        })}
                    </Bar>
                    <Area
                        type="monotone"
                        dataKey="physical"
                        stroke="#ff2d55"
                        strokeWidth={3}
                        fill={`url(#splitColorPhysical-${chartId})`}
                        tension={0.4}
                        name="Физический"
                    />
                    <Area
                        type="monotone"
                        dataKey="emotional"
                        stroke="#00e676"
                        strokeWidth={3}
                        fill={`url(#splitColorEmotional-${chartId})`}
                        tension={0.4}
                        name="Эмоциональный"
                    />
                    <Area
                        type="monotone"
                        dataKey="intellectual"
                        stroke="#2979ff"
                        strokeWidth={3}
                        fill={`url(#splitColorIntellectual-${chartId})`}
                        tension={0.4}
                        name="Интеллектуальный"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BiorhythmChart;
