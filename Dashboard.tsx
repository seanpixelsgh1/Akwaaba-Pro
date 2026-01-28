import React from 'react';
import { Product, Sale, AppPhase } from './types';
import { Trash2, TrendingUp, ShoppingBag, Camera, Package } from 'lucide-react';

interface Props {
  products: Product[];
  sales: Sale[];
  onDeleteProduct: (id: string) => void;
  onNavigate: (phase: AppPhase) => void;
}

const Dashboard: React.FC<Props> = ({ products, sales, onDeleteProduct, onNavigate }) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const todaySales = sales.filter(s => s.timestamp >= today);
  const totalToday = todaySales.reduce((acc, s) => acc + s.total, 0);

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
          <div className="text-emerald-700 flex items-center gap-2 mb-1">
            <TrendingUp size={16} /> <span className="text-xs font-semibold uppercase">Today</span>
          </div>
          <div className="text-xl font-bold text-emerald-900">GH₵ {totalToday.toFixed(2)}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <div className="text-blue-700 flex items-center gap-2 mb-1">
            <ShoppingBag size={16} /> <span className="text-xs font-semibold uppercase">Orders</span>
          </div>
          <div className="text-xl font-bold text-blue-900">{todaySales.length}</div>
        </div>
      </div>

      <button onClick={() => onNavigate('RECORD_SALE')} className="w-full bg-emerald-600 text-white p-5 rounded-2xl flex items-center gap-4 shadow-lg active:scale-95 transition-transform">
        <div className="bg-emerald-500 p-2 rounded-xl"><Camera size={24} /></div>
        <div className="text-left font-bold text-lg">Record a Sale</div>
      </button>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-slate-500 uppercase">Inventory ({products.length})</h2>
          <button onClick={() => onNavigate('PRODUCT_SETUP')} className="text-xs font-bold text-emerald-700">+ ADD NEW</button>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-10 bg-slate-100 rounded-2xl border-2 border-dashed">
            <Package className="mx-auto mb-2 text-slate-300" size={48} />
            <p className="text-slate-400">No products setup yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map(product => (
              <div key={product.id} className="flex items-center gap-3 bg-white p-3 rounded-2xl border shadow-sm">
                <img src={product.imageUrl} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 font-bold">{product.name} <span className="block text-emerald-700">GH₵ {product.price.toFixed(2)}</span></div>
                <button onClick={() => onDeleteProduct(product.id)} className="p-2 text-slate-300"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default Dashboard;
