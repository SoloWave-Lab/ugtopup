import { z } from 'zod';
import { ProductConfig } from '@/types/product';

// Product images
import productFreefire from '@/assets/product-freefire.jpg';
import productTiktok from '@/assets/product-tiktok.jpg';
import productCapcut from '@/assets/product-capcut.jpg';
import gameRoblox from '@/assets/game-roblox.jpg';

// Validation schemas
const usernameValidation = z.string().min(3, 'Username must be at least 3 characters');
const passwordValidation = z.string().min(6, 'Password must be at least 6 characters');
const emailValidation = z.string().email('Invalid email address');
const whatsappValidation = z.string().regex(/^[+]?[0-9]{10,15}$/, 'Invalid WhatsApp number');

// TikTok Coins Configuration
export const tiktokConfig: ProductConfig = {
  id: 'tiktok-coins',
  title: 'TikTok Coin Top-Up',
  subtitle: 'Fast & Secure Delivery',
  icon: '🎵',
  image: productTiktok,
  orderPrefix: 'TT',
  priceSymbol: '₹',
  fields: [
    { 
      name: 'username', 
      label: 'TikTok Username', 
      type: 'text', 
      required: true, 
      placeholder: '@username',
      validation: usernameValidation
    },
    { 
      name: 'password', 
      label: 'TikTok Password', 
      type: 'password', 
      required: true, 
      placeholder: 'Enter password',
      validation: passwordValidation
    },
    { 
      name: 'whatsapp', 
      label: 'WhatsApp Number', 
      type: 'tel', 
      required: true, 
      placeholder: '+91 XXXXX XXXXX',
      validation: whatsappValidation
    }
  ],
  packages: [
    { id: 'tt1', name: '350 Coins', quantity: 350, price: 525, currency: '₹', type: 'coins' },
    { id: 'tt2', name: '700 Coins', quantity: 700, price: 1274, currency: '₹', type: 'coins' },
    { id: 'tt3', name: '1,000 Coins', quantity: 1000, price: 1862, currency: '₹', type: 'coins' },
    { id: 'tt4', name: '1,500 Coins', quantity: 1500, price: 2498, currency: '₹', type: 'coins' },
    { id: 'tt5', name: '2,000 Coins', quantity: 2000, price: 3474, currency: '₹', type: 'coins' },
    { id: 'tt6', name: '5,000 Coins', quantity: 5000, price: 8327, currency: '₹', type: 'coins' },
    { id: 'tt7', name: '7,000 Coins', quantity: 7000, price: 11729, currency: '₹', type: 'coins' },
    { id: 'tt8', name: '10,000 Coins', quantity: 10000, price: 16876, currency: '₹', type: 'coins' },
    { id: 'tt9', name: '14,000 Coins', quantity: 14000, price: 23358, currency: '₹', type: 'coins' },
    { id: 'tt10', name: '21,000 Coins', quantity: 21000, price: 34427, currency: '₹', type: 'coins' }
  ]
};

// CapCut Pro Configuration
export const capcutConfig: ProductConfig = {
  id: 'capcut-pro',
  title: 'CapCut Pro Subscription',
  subtitle: 'Professional Video Editing',
  icon: '🎬',
  image: productCapcut,
  orderPrefix: 'CC',
  priceSymbol: '₹',
  fields: [
    { 
      name: 'whatsapp', 
      label: 'WhatsApp Number', 
      type: 'tel', 
      required: true, 
      placeholder: '+91 XXXXX XXXXX',
      validation: whatsappValidation
    },
    { 
      name: 'email', 
      label: 'Email Address', 
      type: 'email', 
      required: true, 
      placeholder: 'your@email.com',
      validation: emailValidation
    }
  ],
  packages: [
    { id: 'cc1', name: '3 Month Pro', quantity: 3, price: 649, currency: '₹', type: 'subscription' },
    { id: 'cc2', name: '6 Month Pro', quantity: 6, price: 1199, currency: '₹', type: 'subscription' },
    { id: 'cc3', name: '1 Year Pro', quantity: 12, price: 2499, currency: '₹', type: 'subscription' }
  ]
};

// Roblox Robux Configuration
export const robloxConfig: ProductConfig = {
  id: 'roblox-robux',
  title: 'Roblox Robux Purchase',
  subtitle: 'Official Robux Top-Up',
  icon: '🎮',
  image: gameRoblox,
  orderPrefix: 'RX',
  priceSymbol: '₹',
  fields: [
    { 
      name: 'username', 
      label: 'Roblox Username', 
      type: 'text', 
      required: true, 
      placeholder: 'Username',
      validation: usernameValidation
    },
    { 
      name: 'password', 
      label: 'Roblox Password', 
      type: 'password', 
      required: true, 
      placeholder: 'Password',
      validation: passwordValidation
    },
    { 
      name: 'whatsapp', 
      label: 'WhatsApp Number', 
      type: 'tel', 
      required: true, 
      placeholder: '+91 XXXXX XXXXX',
      validation: whatsappValidation
    }
  ],
  packages: [
    { id: 'rx1', name: '1000 ROBUX', quantity: 1000, price: 1499, currency: '₹', type: 'robux' },
    { id: 'rx2', name: '2000 ROBUX', quantity: 2000, price: 2999, currency: '₹', type: 'robux' },
    { id: 'rx3', name: '3000 ROBUX', quantity: 3000, price: 4499, currency: '₹', type: 'robux' },
    { id: 'rx4', name: '4000 ROBUX', quantity: 4000, price: 5999, currency: '₹', type: 'robux' },
    { id: 'rx5', name: '5000 ROBUX', quantity: 5000, price: 7499, currency: '₹', type: 'robux' }
  ]
};

// ChatGPT Subscription Configuration
export const chatgptConfig: ProductConfig = {
  id: 'chatgpt-premium',
  title: 'ChatGPT Premium Subscription',
  subtitle: 'AI-Powered Assistant',
  icon: '🤖',
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop',
  orderPrefix: 'GP',
  priceSymbol: '₹',
  fields: [
    { 
      name: 'email', 
      label: 'Email Address', 
      type: 'email', 
      required: true, 
      placeholder: 'your@email.com',
      validation: emailValidation
    },
    { 
      name: 'emailPassword', 
      label: 'Email Password', 
      type: 'password', 
      required: true, 
      placeholder: 'Email password',
      validation: passwordValidation
    },
    { 
      name: 'whatsapp', 
      label: 'WhatsApp Number', 
      type: 'tel', 
      required: true, 
      placeholder: '+91 XXXXX XXXXX',
      validation: whatsappValidation
    }
  ],
  packages: [
    { id: 'gp1', name: '1 Month Subscription', quantity: 1, price: 1299, currency: '₹', type: 'subscription' },
    { id: 'gp2', name: '3 Month Subscription', quantity: 3, price: 2999, currency: '₹', type: 'subscription' }
  ]
};

// Design Services Configurations
export const logoDesignConfig: ProductConfig = {
  id: 'logo-design',
  title: 'Logo Design Service',
  subtitle: 'Professional Custom Logos',
  icon: '🎨',
  image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=400&h=400&fit=crop',
  orderPrefix: 'LD',
  priceSymbol: '₹',
  fields: [
    { 
      name: 'email', 
      label: 'Email Address', 
      type: 'email', 
      required: true, 
      placeholder: 'your@email.com',
      validation: emailValidation
    },
    { 
      name: 'whatsapp', 
      label: 'WhatsApp Number', 
      type: 'tel', 
      required: true, 
      placeholder: '+91 XXXXX XXXXX',
      validation: whatsappValidation
    }
  ],
  packages: [
    { id: 'ld1', name: 'Logo Design Package', quantity: 1, price: 997, currency: '₹', type: 'service' }
  ]
};

export const postDesignConfig: ProductConfig = {
  id: 'post-design',
  title: 'Post Design Service',
  subtitle: 'Eye-Catching Social Media Posts',
  icon: '📱',
  image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=400&fit=crop',
  orderPrefix: 'PD',
  priceSymbol: '₹',
  fields: [
    { 
      name: 'email', 
      label: 'Email Address', 
      type: 'email', 
      required: true, 
      placeholder: 'your@email.com',
      validation: emailValidation
    },
    { 
      name: 'whatsapp', 
      label: 'WhatsApp Number', 
      type: 'tel', 
      required: true, 
      placeholder: '+91 XXXXX XXXXX',
      validation: whatsappValidation
    }
  ],
  packages: [
    { id: 'pd1', name: 'Post Design Package', quantity: 1, price: 504, currency: '₹', type: 'service' }
  ]
};

export const bannerDesignConfig: ProductConfig = {
  id: 'banner-design',
  title: 'Banner Design Service',
  subtitle: 'Professional Banner Designs',
  icon: '🎪',
  image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
  orderPrefix: 'BD',
  priceSymbol: '₹',
  fields: [
    { 
      name: 'email', 
      label: 'Email Address', 
      type: 'email', 
      required: true, 
      placeholder: 'your@email.com',
      validation: emailValidation
    },
    { 
      name: 'whatsapp', 
      label: 'WhatsApp Number', 
      type: 'tel', 
      required: true, 
      placeholder: '+91 XXXXX XXXXX',
      validation: whatsappValidation
    }
  ],
  packages: [
    { id: 'bd1', name: 'Banner Design Package', quantity: 1, price: 478, currency: '₹', type: 'service' }
  ]
};

export const thumbnailDesignConfig: ProductConfig = {
  id: 'thumbnail-design',
  title: 'Thumbnail Design Service',
  subtitle: 'YouTube & Video Thumbnails',
  icon: '🖼️',
  image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop',
  orderPrefix: 'TD',
  priceSymbol: '₹',
  fields: [
    { 
      name: 'email', 
      label: 'Email Address', 
      type: 'email', 
      required: true, 
      placeholder: 'your@email.com',
      validation: emailValidation
    },
    { 
      name: 'whatsapp', 
      label: 'WhatsApp Number', 
      type: 'tel', 
      required: true, 
      placeholder: '+91 XXXXX XXXXX',
      validation: whatsappValidation
    }
  ],
  packages: [
    { id: 'td1', name: 'Thumbnail Design Package', quantity: 1, price: 502, currency: '₹', type: 'service' }
  ]
};
