"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { mockItems, CATEGORIES } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface OutfitPlanningModalProps {
  date: Date | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (items: string[]) => void;
}

export function OutfitPlanningModal({ date, isOpen, onClose, onSave }: OutfitPlanningModalProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  if (!date) return null;

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getItemsByCategory = (categoryId: string) =>
    mockItems.filter((item) => item.category === categoryId);

  const getSelectedItemsData = () =>
    mockItems.filter((item) => selectedItems.includes(item.id));

  const handleSave = () => {
    onSave?.(selectedItems);
    setSelectedItems([]);
    onClose();
  };

  const handleClear = () => {
    setSelectedItems([]);
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
            className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 bg-card md:rounded-2xl md:max-w-3xl md:w-full md:max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Plan Outfit
                </h2>
                <p className="text-sm text-muted-foreground">{formatDate(date)}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Selected items preview */}
              {selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6"
                >
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Current Outfit ({selectedItems.length} items)
                  </h3>
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {getSelectedItemsData().map((item) => {
                      const bgGradient = item.colors.length > 1
                        ? `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`
                        : item.colors[0];

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden relative"
                          style={{ background: bgGradient }}
                        >
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="absolute top-1 right-1 p-1 bg-card/90 rounded-full"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Categories */}
              <div className="space-y-6">
                {CATEGORIES.map((category) => {
                  const items = getItemsByCategory(category.id);
                  if (items.length === 0) return null;

                  return (
                    <div key={category.id}>
                      <h3 className="text-sm font-medium text-foreground mb-3 capitalize">
                        {category.label}
                      </h3>
                      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                        {items.map((item) => {
                          const isSelected = selectedItems.includes(item.id);
                          const bgGradient = item.colors.length > 1
                            ? `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`
                            : item.colors[0];

                          return (
                            <button
                              key={item.id}
                              onClick={() => toggleItem(item.id)}
                              className={`flex-shrink-0 w-20 rounded-xl overflow-hidden transition-all ${
                                isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                              }`}
                            >
                              <div
                                className="aspect-square relative"
                                style={{ background: bgGradient }}
                              >
                                {isSelected && (
                                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                      <Check className="w-4 h-4 text-primary-foreground" />
                                    </div>
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-foreground p-2 truncate">
                                {item.name}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-4 border-t border-border flex-shrink-0">
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={selectedItems.length === 0}
                className="h-12 px-6 rounded-xl border-border hover:bg-muted disabled:opacity-50"
              >
                Clear
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="h-12 px-6 rounded-xl border-border hover:bg-muted"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={selectedItems.length === 0}
                className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                Save Outfit
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
