"use client";

import { motion } from 'framer-motion';
import { Package, TrendingUp, Palette, Plus, CalendarDays, LogOut, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { mockUser, getDashboardStats, getColorDistribution, getCategoryWearCounts, getItemsOverTime, COLOR_OPTIONS } from '@/data/mockData';

const CHART_COLORS = ['#c96952', '#d4a574', '#8b9a7b', '#1e3a5f', '#722f37', '#6b7280', '#ec4899', '#3b82f6'];

export default function Dashboard() {
  const router = useRouter();
  const stats = getDashboardStats();
  const colorData = getColorDistribution();
  const categoryData = getCategoryWearCounts();
  const timeData = getItemsOverTime();

  const favoriteColorName = COLOR_OPTIONS.find(c => c.value === stats.favoriteColor)?.name || 'Unknown';

  return (
    <AppLayout>
      <div className="p-4 md:p-8 pb-24 md:pb-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Welcome, {mockUser.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s your wardrobe overview
            </p>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="hidden md:flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </motion.header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Items"
            value={stats.totalItems}
            icon={Package}
            delay={0}
          />
          <StatsCard
            title="Most Worn"
            value={stats.mostWorn.wearCount}
            subtitle={stats.mostWorn.name}
            icon={TrendingUp}
            delay={0.1}
          />
          <StatsCard
            title="Favorite Color"
            value={favoriteColorName}
            icon={Palette}
            color={stats.favoriteColor}
            delay={0.2}
          />
          <StatsCard
            title="Added This Week"
            value={stats.itemsThisWeek}
            icon={Star}
            delay={0.3}
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <Button
            onClick={() => router.push('/wardrobe/add')}
            className="h-12 px-6 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Item
          </Button>
          <Button
            onClick={() => router.push('/calendar')}
            variant="outline"
            className="h-12 px-6 rounded-xl border-border hover:bg-muted font-medium"
          >
            <CalendarDays className="w-5 h-5 mr-2" />
            Plan Outfit
          </Button>
        </motion.div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Color Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card-elevated p-5"
          >
            <h3 className="font-display text-lg font-semibold mb-4">Color Distribution</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={colorData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                  >
                    {colorData.map((_, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(40 40% 99%)',
                      border: '1px solid hsl(30 20% 88%)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px hsl(25 30% 15% / 0.06)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {colorData.slice(0, 4).map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[index] }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Wear Counts Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card-elevated p-5"
          >
            <h3 className="font-display text-lg font-semibold mb-4">Wear Count by Category</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(40 40% 99%)',
                      border: '1px solid hsl(30 20% 88%)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px hsl(25 30% 15% / 0.06)',
                    }}
                  />
                  <Bar
                    dataKey="wearCount"
                    fill="hsl(12 45% 55%)"
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Items Added Over Time Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card-elevated p-5 md:col-span-2 lg:col-span-1"
          >
            <h3 className="font-display text-lg font-semibold mb-4">Items Added Over Time</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 20% 88%)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(40 40% 99%)',
                      border: '1px solid hsl(30 20% 88%)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px hsl(25 30% 15% / 0.06)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="items"
                    stroke="hsl(38 70% 60%)"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(38 70% 60%)', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(12 45% 55%)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
