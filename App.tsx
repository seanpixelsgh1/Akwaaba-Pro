import React, { useState, useEffect } from 'react';
import { AppPhase, Product, Sale } from './types';
import Dashboard from './Dashboard';
import ProductSetup from './ProductSetup';
import RecordSale from './RecordSale';
import Reports from './Reports';
import { LayoutDashboard, PackagePlus, Camera, BarChart3, CloudCheck, CloudOff } from 'lucide-react';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('DASHBOARD');
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    const savedProducts = localStorage.getItem('products');
    const savedSales = localStorage.getItem('sales');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedSales) setSales(JSON.parse(savedSales));
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveProduct = (product: Product) => {
    const updated = [...products, product];
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
    setPhase('DASHBOARD');
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const saveSale = (sale: Sale) => {
    const updated = [...sales, sale];
    setSales(updated);
    localStorage.setItem('sales', JSON.stringify(updated));
    setPhase('DASHBOARD');
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      <header className="bg-emerald-700 text-white p-4 pt-6 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <h1 className="text-xl font-bold">Akwaaba Sales</h1>
        {isOnline ? <CloudCheck size={18} className="text-emerald-300" /> : <CloudOff size={18} className="text-orange-300" />}
      </header>
      <main className="flex-1 overflow-y-auto pb-32">
        {phase === 'DASHBOARD' && <Dashboard products={products} sales={sales} onDeleteProduct={deleteProduct} onNavigate={setPhase} />}
        {phase === 'PRODUCT_SETUP' && <ProductSetup onSave={saveProduct} onBack={() => setPhase('DASHBOARD')} />}
        {phase === 'RECORD_SALE' && <RecordSale products={products} onSave={saveSale} onBack={() => setPhase('DASHBOARD')} />}
        {phase === 'REPORTS' && <Reports sales={sales} products={products} onBack={() => setPhase('DASHBOARD')} />}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around p-3 z-50 pb-safe">
        <NavBtn act={phase==='DASHBOARD'} clk={()=>setPhase('DASHBOARD')} ico={<LayoutDashboard/>} lbl="Home" />
        <NavBtn act={phase==='PRODUCT_SETUP'} clk={()=>setPhase('PRODUCT_SETUP')} ico={<PackagePlus/>} lbl="Setup" />
        <NavBtn act={phase==='RECORD_SALE'} clk={()=>setPhase('RECORD_SALE')} ico={<Camera/>} lbl="Sell" />
        <NavBtn act={phase==='REPORTS'} clk={()=>setPhase('REPORTS')} ico={<BarChart3/>} lbl="Reports" />
      </nav>
    </div>
  );
};

const NavBtn = ({act, clk, ico, lbl}: any) => (
  <button onClick={clk} className={`flex flex-col items-center gap-1 ${act ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
    {React.cloneElement(ico, { size: 22 })}
    <span className="text-[10px] uppercase">{lbl}</span>
  </button>
);
export default App;
