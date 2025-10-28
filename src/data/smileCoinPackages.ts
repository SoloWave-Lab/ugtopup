export interface SmileCoinPackage {
  id: string;
  type: 'coin';
  name: string;
  quantity: number;
  price: number;
  currency: string;
}

export const smileCoinPackages: SmileCoinPackage[] = [
  { 
    id: 'sc1', 
    type: 'coin', 
    name: '1000 SMILE COIN', 
    quantity: 1000, 
    price: 2927, 
    currency: '₹' 
  },
];
