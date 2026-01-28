import React, { useState, useRef } from 'react';
import { Product, Sale } from './types';
import { identifyProduct } from './gemini';
import { ArrowLeft, Camera, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';

export default function RecordSale({ products, onSave, onBack }: any) {
  const [img, setImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCap = (e: any) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImg(base64);
      setLoading(true);
      const res = await identifyProduct(base64, products);
      if(res) setMatch(products.find((p:any) => p.id === res.productId));
      setLoading(false);
    };
    if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack}><ArrowLeft /></button>
        <h2 className="text-xl font-bold">Record Sale</h2>
      </div>

      {!img ? (
        <div className="flex flex-col items-center py-20">
          <button onClick={() => fileInputRef.current?.click()} className="w-48 h-48 rounded-full bg-emerald-50 flex flex-col items-center justify-center border-4 border-emerald-100 shadow-xl">
            <Camera size={64} className="text-emerald-600 mb-2" />
            <span className="font-bold text-emerald-700">SNAP PHOTO</span>
          </button>
          <input type="file" accept="image/*" capture="environment" className="hidden" ref={fileInputRef} onChange={handleCap} />
        </div>
      ) : (
        <div className="space-y-6">
          <img src={img} className="w-full h-48 object-cover rounded-2xl" />
          {loading && <div className="flex items-center justify-center gap-3 py-4 bg-emerald-50 rounded-xl text-emerald-700 font-bold"><Loader2 className="animate-spin" /> Detecting...</div>}
          {match && !loading && (
            <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg">
              <div className="text-2xl font-bold">{match.name}</div>
              <div className="text-3xl font-black mb-4">GH₵ {match.price.toFixed(2)}</div>
              <button onClick={() => onSave({id: Date.now().toString(), productName: match.name, total: match.price, timestamp: Date.now()})} className="w-full bg-white text-emerald-700 p-4 rounded-xl font-bold">CONFIRM SALE</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
