import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Table, Sticker } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: Array<{
    key?: string;
    title: string;
    icon: React.ElementType;
    description: string;
    image: string;
  }>;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  const translations = useTranslations();
  const t = translations?.landing?.nfc;
  
  // Map product keys to their translated values
  const getProductData = (product: any, index: number) => {
    const key = product.key || `product${index}`;
    
    return {
      icon: product.icon,
      title: t?.products?.[key]?.title || product.title,
      description: t?.products?.[key]?.description || product.description,
      image: product.image,
      index
    };
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
    >
      {products.map((product, index) => (
        <ProductCard
          key={index}
          {...getProductData(product, index)}
        />
      ))}
    </motion.div>
  );
};

export default React.memo(ProductsGrid);