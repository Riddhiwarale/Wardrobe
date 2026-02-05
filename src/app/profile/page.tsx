"use client";

import { motion } from 'framer-motion';
import { User, Mail, Bell, BarChart3, Palette, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockUser } from '@/data/mockData';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-8 pb-24 md:pb-8 max-w-2xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Profile
          </h1>
        </motion.header>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {mockUser.name}
              </h2>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {mockUser.email}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-6 h-12 rounded-xl border-border hover:bg-muted"
          >
            Edit Profile
          </Button>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-elevated p-6 mb-6"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Settings
          </h3>

          <div className="space-y-6">
            {/* Email notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive outfit reminders
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Wear count tracking */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Wear Count Tracking</p>
                  <p className="text-sm text-muted-foreground">
                    Track how often you wear items
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Color analysis */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Palette className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Color Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Auto-detect item colors
                  </p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full h-12 rounded-xl border-destructive text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* App version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Wardrobe App v1.0.0
        </motion.p>
      </div>
    </AppLayout>
  );
}
