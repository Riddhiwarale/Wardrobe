"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { ItemCard } from '@/components/wardrobe/ItemCard';
import { ItemDetailModal } from '@/components/wardrobe/ItemDetailModal';
import { mockItems, CATEGORIES, WardrobeItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CategoryFilter = 'all' | 'tops' | 'bottoms' | 'shoes' | 'accessories' | 'outerwear';

export default function Wardrobe() {
  const router = useRouter();
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = filter === 'all'
    ? mockItems
    : mockItems.filter(item => item.category === filter);

  const handleItemClick = (item: WardrobeItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-8 pb-24 md:pb-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            My Wardrobe
          </h1>

          {/* Filter dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filter} onValueChange={(v) => setFilter(v as CategoryFilter)}>
              <SelectTrigger className="w-[140px] h-10 rounded-xl border-border bg-card">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border rounded-xl">
                <SelectItem value="all">All Items</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.header>

        {/* Category pills for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-4 md:hidden"
        >
          <button
            onClick={() => setFilter('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as CategoryFilter)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Items count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground mb-4"
        >
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </motion.p>

        {/* Items grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredItems.map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-4">
              No items match the selected filter
            </p>
            <Button
              onClick={() => setFilter('all')}
              variant="outline"
              className="rounded-xl"
            >
              Clear filter
            </Button>
          </motion.div>
        )}

        {/* Floating Action Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          onClick={() => router.push('/wardrobe/add')}
          className="fixed bottom-24 md:bottom-8 right-4 md:right-8 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity z-40"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </AppLayout>
  );
}
