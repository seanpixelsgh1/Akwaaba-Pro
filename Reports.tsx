import React from 'react';
import { Sale } from './types';
import { ArrowLeft, Award, TrendingUp } from 'lucide-react';

export default function Reports({ sales, onBack }: any) {
  const total = sales.reduce((acc:any, s:any) => acc + s.total, 0);
  return (
    <div className="p-4 bg-slate-50 min-h-full">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack}><ArrowLeft /></button>
        <h2 className="text-xl font-bold">Sales Reports</h2>
      </div>
      <div className="bg-emerald-800 text-white p-6 rounded-3xl mb-6 shadow-xl">
        <div className="text-xs uppercase font-bold opacity-70 mb-1">Total Revenue</div>
        <div className="text-4xl font-black">GH₵ {total.toFixed(2)}</div>
      </div>
      <h3 className="font-bold mb-4 text-slate-500 uppercase text-xs tracking-widest">Recent Activity</h3>
      <div className="space-y-2">
        {sales.slice(-10).reverse().map((s:any) => (
          <div key={s.id} className="p-4 bg-white border rounded-2xl flex justify-between items-center shadow-sm">
            <div>
              <div className="font-bold text-slate-800">{s.productName}</div>
              <div className="text-[10px] text-slate-400">{new Date(s.timestamp).toLocaleTimeString()}</div>
            </div>
            <div className="text-emerald-700 font-black">GH₵ {s.total.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
