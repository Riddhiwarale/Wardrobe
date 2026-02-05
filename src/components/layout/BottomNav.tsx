"use client";

import { Home, Shirt, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Shirt, label: 'Wardrobe', path: '/wardrobe' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`bottom-nav-item min-w-[64px] ${isActive ? 'active' : ''}`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
