import React, { useState } from 'react';
import { Product } from './types';
import { ArrowLeft, Camera, Loader2 } from 'lucide-react';

export default function ProductSetup({ onSave, onBack }: any) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImg = (e: any) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      onSave({ id: Date.now().toString(), name, price: parseFloat(price), imageUrl: image, timestamp: Date.now() });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack}><ArrowLeft /></button>
        <h2 className="text-xl font-bold">New Product</h2>
      </div>
      <div className="flex flex-col items-center mb-6">
        <label className="w-40 h-40 bg-slate-100 rounded-3xl border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden">
          {image ? <img src={image} className="w-full h-full object-cover" /> : <Camera className="text-slate-400" size={32} />}
          <input type="file" accept="image/*" className="hidden" onChange={handleImg} />
        </label>
      </div>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Product Name" className="w-full p-4 bg-slate-50 rounded-xl mb-4 border" />
      <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price (GH₵)" className="w-full p-4 bg-slate-50 rounded-xl mb-6 border" />
      <button onClick={handleSave} disabled={loading} className="w-full bg-emerald-700 text-white p-4 rounded-xl font-bold">
        {loading ? <Loader2 className="animate-spin mx-auto" /> : 'SAVE PRODUCT'}
      </button>
    </div>
  );
}
