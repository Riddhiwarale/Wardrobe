"use client";

import { motion } from 'framer-motion';
import { WardrobeItem } from '@/data/mockData';

interface ItemCardProps {
  item: WardrobeItem;
  onClick: () => void;
  index: number;
}

export function ItemCard({ item, onClick, index }: ItemCardProps) {
  // Generate a gradient based on item colors
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
      {/* Image/Color placeholder */}
      <div
        className="aspect-square w-full relative overflow-hidden"
        style={{ background: bgGradient }}
      >
        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

        {/* Category badge */}
        <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-card/90 backdrop-blur-sm rounded-full text-foreground capitalize">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-foreground text-sm line-clamp-1 mb-1">
          {item.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Worn {item.wearCount} times
          </span>

          {/* Color dots */}
          <div className="flex -space-x-1">
            {item.colors.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="color-swatch-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
