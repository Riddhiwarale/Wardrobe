"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { WardrobeItem } from '@/data/mockData';

interface ItemCardProps {
  item: WardrobeItem;
  onClick: () => void;
  index: number;
}

export function ItemCard({ item, onClick, index }: ItemCardProps) {
  // Generate a gradient fallback based on item colors
  const bgGradient = item.colors.length > 1
    ? `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`
    : item.colors[0];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      className="item-card w-full text-left cursor-pointer group"
    >
      {/* Item Image */}
      <div className="aspect-square w-full relative overflow-hidden bg-muted">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div style={{ background: bgGradient }} className="w-full h-full" />
        )}

        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-foreground text-sm line-clamp-1 mb-1">
          {item.name}
        </h3>

        <span className="text-xs text-muted-foreground">
          Worn {item.wearCount} times
        </span>
      </div>
    </motion.button>
  );
}
