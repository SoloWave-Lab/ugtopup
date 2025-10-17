import { z } from 'zod';

export interface Package {
  id: string;
  name: string;
  quantity: number;
  price: number;
  currency: string;
  type?: 'diamond' | 'subscription' | 'zone' | 'pass' | 'service' | 'coins' | 'robux';
}

export interface SelectedPackage extends Package {
  selectedQuantity: number;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel';
  required: boolean;
  placeholder: string;
  validation?: z.ZodString;
}

export interface ProductConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  orderPrefix: string;
  priceSymbol: string;
  fields: FormField[];
  packages: Package[];
}
