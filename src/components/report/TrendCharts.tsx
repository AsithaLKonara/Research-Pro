"use client";

import { RankedProduct } from "@/lib/research/ranking";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

export function TrendCharts({ products }: { products?: RankedProduct[] }) {
  if (!products || products.length === 0) {
    return null;
  }

  // Format data for the chart. Let's take the top 5 products for cleaner visualization.
  const chartData = products.slice(0, 5).map(p => ({
    name: p.modelName.length > 15 ? p.modelName.substring(0, 15) + "..." : p.modelName,
    fullName: p.modelName,
    score: Number(p.overallScore.toFixed(1)),
  }));

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0B1019] p-5 sm:p-7">
      <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Top Candidates Score Comparison
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#64748B" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ 
                backgroundColor: '#101621', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '8px',
                color: '#f1f5f9'
              }}
              formatter={(value: any) => [`${value} / 100`, 'Overall Score']}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />
            <Bar 
              dataKey="score" 
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? '#22d3ee' : 'rgba(34, 211, 238, 0.4)'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
