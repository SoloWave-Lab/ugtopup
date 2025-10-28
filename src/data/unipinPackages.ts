export interface UnipinPackage {
  id: string;
  type: 'uc';
  name: string;
  quantity: number;
  price: number;
  currency: string;
}

export const unipinPackages: UnipinPackage[] = [
  { 
    id: 'up1', 
    type: 'uc', 
    name: 'UNIPIN 2000 UC POINT', 
    quantity: 2000, 
    price: 2235, 
    currency: '₹' 
  },
];
