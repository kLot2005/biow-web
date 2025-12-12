import React from 'react';
import { ComposedChart, Bar, Cell, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const BiorhythmChart = ({ data }) => {
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
        <div className="w-full h-96 bg-white/50 backdrop-blur rounded-2xl shadow-inner p-4 border border-white/40">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="splitColorPhysical" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="#ff2d55" stopOpacity={0.6} />
                            <stop offset={off} stopColor="#ff2d55" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="splitColorEmotional" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="#00e676" stopOpacity={0.6} />
                            <stop offset={off} stopColor="#00e676" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="splitColorIntellectual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="#2979ff" stopOpacity={0.6} />
                            <stop offset={off} stopColor="#2979ff" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                    <XAxis
                        dataKey="formattedDate"
                        tick={{ fontSize: 12 }}
                        interval={0}
                        stroke="#666"
                        tickLine={false}
                    />
                    <YAxis domain={[-1.2, 1.2]} hide />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <ReferenceLine y={0} stroke="#000" strokeOpacity={0.2} />

                    <Bar dataKey="barHeight" barSize={20} radius={[4, 4, 0, 0]} name="Сводный">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                        ))}
                    </Bar>

                    <Area
                        type="monotone"
                        dataKey="physical"
                        stroke="#ff2d55"
                        strokeWidth={4}
                        fill="url(#splitColorPhysical)"
                        tension={0.4}
                        name="Физический"
                    />
                    <Area
                        type="monotone"
                        dataKey="emotional"
                        stroke="#00e676"
                        strokeWidth={4}
                        fill="url(#splitColorEmotional)"
                        tension={0.4}
                        name="Эмоциональный"
                    />
                    <Area
                        type="monotone"
                        dataKey="intellectual"
                        stroke="#2979ff"
                        strokeWidth={4}
                        fill="url(#splitColorIntellectual)"
                        tension={0.4}
                        name="Интеллектуальный"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BiorhythmChart;
