"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Trash2, CalendarPlus, Calendar, Shirt } from 'lucide-react';
import Image from 'next/image';
import { WardrobeItem, COLOR_OPTIONS, CATEGORIES, mockOutfits, mockEvents, mockItems } from '@/data/mockData';
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

  // Find all outfits that include this item
  const outfitsWithItem = mockOutfits.filter(outfit => outfit.items.includes(item.id));

  // Find events associated with those outfits
  const eventsWithItem = mockEvents.filter(event =>
    event.outfitPlanned && outfitsWithItem.some(outfit => outfit.id === event.outfitId)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Find all other items worn with this item
  const pairedItemIds = new Set<string>();
  outfitsWithItem.forEach(outfit => {
    outfit.items.forEach(itemId => {
      if (itemId !== item.id) {
        pairedItemIds.add(itemId);
      }
    });
  });
  const pairedItems = mockItems.filter(i => pairedItemIds.has(i.id));

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatShortDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
            <div className="w-full aspect-square md:aspect-video flex-shrink-0 relative bg-muted">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 512px"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{ background: bgGradient }}
                />
              )}
            </div>

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

                {/* When Was Item Worn - Events */}
                {eventsWithItem.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-3 block flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      When Was This Item Worn
                    </label>
                    <div className="space-y-2">
                      {eventsWithItem.slice(0, 5).map((event) => {
                        const outfit = mockOutfits.find(o => o.id === event.outfitId);
                        return (
                          <div
                            key={event.id}
                            className="p-3 rounded-lg bg-muted/50 border border-border"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {event.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {formatShortDate(event.date)} {event.time && `• ${event.time}`}
                                </p>
                                {outfit && (
                                  <p className="text-xs text-primary mt-1">
                                    Outfit: {outfit.title}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {eventsWithItem.length > 5 && (
                        <p className="text-xs text-muted-foreground text-center pt-2">
                          + {eventsWithItem.length - 5} more events
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Items Worn Together */}
                {pairedItems.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-3 block flex items-center gap-2">
                      <Shirt className="w-4 h-4" />
                      Frequently Worn With
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {pairedItems.slice(0, 6).map((pairedItem) => {
                        const itemBgGradient = pairedItem.colors.length > 1
                          ? `linear-gradient(135deg, ${pairedItem.colors[0]} 0%, ${pairedItem.colors[1]} 100%)`
                          : pairedItem.colors[0];

                        return (
                          <div
                            key={pairedItem.id}
                            className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border hover:bg-muted/80 transition-colors cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                              {pairedItem.image ? (
                                <Image
                                  src={pairedItem.image}
                                  alt={pairedItem.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div
                                  className="w-full h-full"
                                  style={{ background: itemBgGradient }}
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground truncate">
                                {pairedItem.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {CATEGORIES.find(c => c.id === pairedItem.category)?.label}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {pairedItems.length > 6 && (
                      <p className="text-xs text-muted-foreground text-center pt-2">
                        + {pairedItems.length - 6} more items
                      </p>
                    )}
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
