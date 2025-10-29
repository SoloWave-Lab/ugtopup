export interface GarenaPackage {
  id: string;
  type: 'shell';
  name: string;
  quantity: number;
  price: number;
  currency: string;
}

export const garenaPackages: GarenaPackage[] = [
  { 
    id: 'gr1', 
    type: 'shell', 
    name: 'GARENA SHELL 1300 RGG', 
    quantity: 1300, 
    price: 1499, 
    currency: '₹' 
  },
];
