"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
  delay?: number;
}

export function StatsCard({ title, value, subtitle, icon: Icon, color, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="stats-card"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-xl bg-muted">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {color && (
          <div
            className="w-6 h-6 rounded-full border-2 border-card shadow-sm"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
      <div className="font-display text-2xl font-semibold text-foreground mb-1">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{title}</div>
      {subtitle && (
        <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
      )}
    </motion.div>
  );
}
