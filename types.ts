export interface Product { id: string; name: string; price: number; imageUrl: string; createdAt?: number; }
export interface Sale { id: string; productName: string; total: number; timestamp: number; quantity?: number; }
export type AppPhase = 'DASHBOARD' | 'PRODUCT_SETUP' | 'RECORD_SALE' | 'REPORTS';
