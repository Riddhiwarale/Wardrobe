"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Trash2, CalendarPlus } from 'lucide-react';
import { WardrobeItem, COLOR_OPTIONS, CATEGORIES } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface ItemDetailModalProps {
  item: WardrobeItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
  if (!item) return null;

  const bgGradient = item.colors.length > 1
    ? `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`
    : item.colors[0];

  const categoryLabel = CATEGORIES.find(c => c.id === item.category)?.label || item.category;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-overlay"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 bg-card md:rounded-2xl md:max-w-lg md:w-full md:max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div
              className="w-full aspect-square md:aspect-video flex-shrink-0"
              style={{ background: bgGradient }}
            />

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground mb-2">
                    {categoryLabel}
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    {item.name}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {/* Colors */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Colors
                  </label>
                  <div className="flex gap-2">
                    {item.colors.map((color, i) => {
                      const colorName = COLOR_OPTIONS.find(c => c.value === color)?.name || 'Custom';
                      return (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                          <div
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-sm">{colorName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Brand */}
                {item.brand && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">
                      Brand
                    </label>
                    <p className="text-foreground">{item.brand}</p>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-xl">
                    <p className="text-sm text-muted-foreground">Wear Count</p>
                    <p className="text-xl font-semibold text-foreground">{item.wearCount}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-xl">
                    <p className="text-sm text-muted-foreground">Purchase Date</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(item.purchaseDate)}</p>
                  </div>
                </div>

                {item.lastWorn && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">
                      Last Worn
                    </label>
                    <p className="text-foreground">{formatDate(item.lastWorn)}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-8">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-border hover:bg-muted"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-border hover:bg-muted"
                >
                  <CalendarPlus className="w-4 h-4 mr-2" />
                  Add to Outfit
                </Button>
                <Button
                  variant="outline"
                  className="h-12 px-4 rounded-xl border-destructive text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
