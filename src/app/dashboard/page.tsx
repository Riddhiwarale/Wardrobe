"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Package, TrendingUp, Plus, CalendarDays, CalendarPlus, Shirt, CheckCircle2, AlertCircle, Clock, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { mockUser, mockItems, mockOutfits, mockEvents, mockActivities } from '@/data/mockData';

export default function Dashboard() {
  const router = useRouter();

  // Get today's date
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Find today's outfit
  const todaysOutfit = mockOutfits.find(o => o.date === todayStr);
  const todaysOutfitItems = todaysOutfit ? mockItems.filter(item => todaysOutfit.items.includes(item.id)) : [];

  // Find today's events
  const todaysEvents = mockEvents.filter(e => e.date === todayStr);
  const todaysEventsWithOutfits = todaysEvents.filter(e => e.outfitPlanned).length;

  // Stats
  const totalItems = mockItems.length;
  const outfitsCreated = mockOutfits.length;

  // Events this week
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)

  const eventsThisWeek = mockEvents.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate >= weekStart && eventDate <= weekEnd;
  });

  const eventsWithOutfits = eventsThisWeek.filter(e => e.outfitPlanned).length;

  // Upcoming events (next 5)
  const upcomingEvents = mockEvents
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  // Recent activities (last 5)
  const recentActivities = mockActivities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHrs > 0) return `${diffHrs}h ago`;
    return 'Just now';
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 pb-24 md:pb-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-1">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {mockUser.name}
          </h1>
          <p className="text-muted-foreground text-sm">
            {formatDate(todayStr)}
          </p>
        </motion.header>

        {/* Today's Outfit */}
        {todaysOutfit ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-elevated p-4 md:p-5 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-foreground">Today&apos;s Outfit</h2>
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {todaysOutfit.title}
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {todaysOutfitItems.map((item) => {
                const bgGradient = item.colors.length > 1
                  ? `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`
                  : item.colors[0];
                return (
                  <div key={item.id} className="flex-shrink-0 w-20">
                    <div className="aspect-square rounded-xl mb-2 relative overflow-hidden bg-muted">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{ background: bgGradient }}
                        />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{item.name}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-elevated p-6 mb-6 text-center"
          >
            <Shirt className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground mb-3">No outfit planned for today</p>
            <Button
              onClick={() => router.push('/calendar')}
              size="sm"
              className="rounded-xl"
            >
              Plan Outfit
            </Button>
          </motion.div>
        )}

        {/* Today's Events */}
        {todaysEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-elevated p-4 md:p-5 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Today&apos;s Events
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                {todaysEventsWithOutfits}/{todaysEvents.length} planned
              </span>
            </div>
            <div className="space-y-2">
              {todaysEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => router.push('/calendar')}
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{event.title}</p>
                    {event.time && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </p>
                    )}
                  </div>
                  {event.outfitPlanned ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary hidden sm:inline">Outfit Ready</span>
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground hidden sm:inline">No Outfit</span>
                      <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-elevated p-6 mb-6 text-center"
          >
            <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground mb-3">No events scheduled for today</p>
            <Button
              onClick={() => router.push('/calendar')}
              size="sm"
              className="rounded-xl"
            >
              Add Event
            </Button>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="card-elevated p-4 text-center">
            <Package className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="font-display text-2xl font-semibold text-foreground">{totalItems}</div>
            <div className="text-xs text-muted-foreground mt-1">Total Items</div>
          </div>
          <div className="card-elevated p-4 text-center">
            <CalendarDays className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="font-display text-2xl font-semibold text-foreground">{outfitsCreated}</div>
            <div className="text-xs text-muted-foreground mt-1">Outfits</div>
          </div>
          <div className="card-elevated p-4 text-center">
            <CalendarPlus className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="font-display text-2xl font-semibold text-foreground">{eventsThisWeek.length}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Events This Week
            </div>
            {eventsThisWeek.length > 0 && (
              <div className="text-xs text-primary mt-1">
                {eventsWithOutfits}/{eventsThisWeek.length} planned
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <Button
            onClick={() => router.push('/wardrobe/add')}
            variant="outline"
            className="h-auto py-4 px-3 flex flex-col items-center gap-2 rounded-xl border-border hover:bg-muted"
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs font-medium">Add Item</span>
          </Button>
          <Button
            onClick={() => router.push('/calendar')}
            variant="outline"
            className="h-auto py-4 px-3 flex flex-col items-center gap-2 rounded-xl border-border hover:bg-muted"
          >
            <CalendarDays className="w-5 h-5" />
            <span className="text-xs font-medium">Plan Outfit</span>
          </Button>
          <Button
            onClick={() => router.push('/calendar')}
            variant="outline"
            className="h-auto py-4 px-3 flex flex-col items-center gap-2 rounded-xl border-border hover:bg-muted"
          >
            <CalendarPlus className="w-5 h-5" />
            <span className="text-xs font-medium">Add Event</span>
          </Button>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-elevated p-4 md:p-5 mb-6"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => router.push('/calendar')}
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(event.date)} {event.time && `• ${event.time}`}
                    </p>
                  </div>
                  {event.outfitPlanned ? (
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-center text-muted-foreground text-sm py-4">No upcoming events</p>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-elevated p-4 md:p-5"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'added' ? 'bg-primary/10' :
                  activity.type === 'planned' ? 'bg-accent/10' :
                  'bg-secondary'
                }`}>
                  {activity.type === 'added' && <Plus className="w-4 h-4 text-primary" />}
                  {activity.type === 'planned' && <CalendarDays className="w-4 h-4 text-accent" />}
                  {activity.type === 'worn' && <CheckCircle2 className="w-4 h-4 text-secondary-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {getTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
