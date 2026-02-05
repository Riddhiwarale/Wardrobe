"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Sparkles, ChevronLeft } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { CATEGORIES, COLOR_OPTIONS } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AddItem() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [brand, setBrand] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: 1,
  });

  const toggleColor = (colorValue: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorValue)
        ? prev.filter((c) => c !== colorValue)
        : [...prev, colorValue]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    router.push('/wardrobe');
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-8 pb-24 md:pb-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Add New Item
          </h1>
        </motion.header>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div
                {...getRootProps()}
                className={`upload-zone aspect-square flex flex-col items-center justify-center ${
                  isDragActive ? 'active' : ''
                } ${imagePreview ? 'p-0 border-solid' : ''}`}
              >
                <input {...getInputProps()} />
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                      }}
                      className="absolute top-3 right-3 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-foreground font-medium mb-1">
                      {isDragActive ? 'Drop your photo here' : 'Drag photo here or click to upload'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG or WebP
                    </p>
                  </>
                )}
              </div>

              {/* AI note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mt-4 p-3 bg-accent/20 rounded-xl"
              >
                <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Background will be removed automatically
                </p>
              </motion.div>
            </motion.div>

            {/* Form Fields */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Blue Denim Jacket"
                  className="input-styled"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="w-full h-12 rounded-xl border-border bg-muted/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border rounded-xl">
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Colors
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => toggleColor(color.value)}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        selectedColors.includes(color.value)
                          ? 'border-primary scale-110'
                          : 'border-card'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                {selectedColors.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedColors.length} color(s) selected
                  </p>
                )}
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Brand (optional)
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g., Levi's"
                  className="input-styled"
                />
              </div>

              {/* Purchase Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="input-styled"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes..."
                  rows={3}
                  className="input-styled resize-none"
                />
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 mt-8"
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 md:flex-none h-12 px-8 rounded-xl border-border hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving || !name || !category}
              className="flex-1 md:flex-none h-12 px-8 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {isSaving ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                />
              ) : (
                'Save Item'
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </AppLayout>
  );
}
