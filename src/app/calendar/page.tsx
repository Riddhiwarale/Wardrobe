"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Shirt, Calendar as CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { OutfitPlanningModal } from '@/components/calendar/OutfitPlanningModal';
import { mockOutfits, mockEvents, mockItems } from '@/data/mockData';
import { Button } from '@/components/ui/button';

type ViewType = 'month' | 'week';

interface DayData {
  date: Date;
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasOutfit: boolean;
  hasEvent: boolean;
  outfits: typeof mockOutfits;
  events: typeof mockEvents;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get days for month view
  const getMonthDays = (date: Date): DayData[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    const days: DayData[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const dayOutfits = mockOutfits.filter(o => o.date === dateStr);
      const dayEvents = mockEvents.filter(e => e.date === dateStr);

      days.push({
        date: new Date(d),
        dateStr,
        isCurrentMonth: d.getMonth() === month,
        isToday: d.getTime() === today.getTime(),
        hasOutfit: dayOutfits.length > 0,
        hasEvent: dayEvents.length > 0,
        outfits: dayOutfits,
        events: dayEvents,
      });
    }

    return days;
  };

  // Get next 7 days for week view
  const getWeekDays = (date: Date): DayData[] => {
    const days: DayData[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const d = new Date(date);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayOutfits = mockOutfits.filter(o => o.date === dateStr);
      const dayEvents = mockEvents.filter(e => e.date === dateStr);

      days.push({
        date: new Date(d),
        dateStr,
        isCurrentMonth: true,
        isToday: d.getTime() === today.getTime(),
        hasOutfit: dayOutfits.length > 0,
        hasEvent: dayEvents.length > 0,
        outfits: dayOutfits,
        events: dayEvents,
      });
    }

    return days;
  };

  const monthDays = useMemo(() => getMonthDays(currentDate), [currentDate]);
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  // Get upcoming events (from current month onwards for month view, from current date for week view)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return mockEvents
      .filter(e => new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, []);

  const handlePrevious = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    }
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: typeof mockEvents[0]) => {
    setSelectedDate(new Date(event.date));
    setIsModalOpen(true);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatWeekRange = (date: Date) => {
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 6);
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 pb-24 md:pb-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Outfit Calendar
          </h1>

          {/* View toggle and Add Event button */}
          <div className="flex gap-2">
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              onClick={() => setView('month')}
              size="sm"
              className="rounded-xl"
            >
              Month
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              onClick={() => setView('week')}
              size="sm"
              className="rounded-xl"
            >
              Week
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedDate(new Date());
                setIsModalOpen(true);
              }}
              size="sm"
              className="rounded-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </div>
        </motion.header>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-6"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="rounded-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <h2 className="font-display text-lg md:text-xl font-semibold text-foreground">
            {view === 'month' ? formatMonthYear(currentDate) : formatWeekRange(currentDate)}
          </h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="rounded-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'month' ? (
            <motion.div
              key="month"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Month View */}
              <div className="card-elevated p-3 md:p-4 mb-6">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs md:text-sm font-semibold text-muted-foreground py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                  {monthDays.map((day, index) => (
                    <motion.div
                      key={day.dateStr}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.005 }}
                      onClick={() => handleDayClick(day.date)}
                      className={`
                        relative aspect-square rounded-lg p-2 cursor-pointer
                        transition-all duration-200 hover:shadow-md flex flex-col
                        ${day.isToday
                          ? 'bg-primary/5 border-2 border-primary shadow-sm'
                          : 'bg-muted/20 hover:bg-muted/40 border border-border'
                        }
                        ${!day.isCurrentMonth ? 'opacity-30' : ''}
                      `}
                    >
                      {/* Date number */}
                      <span
                        className={`text-sm md:text-base font-semibold ${
                          day.isToday ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {day.date.getDate()}
                      </span>

                      {/* Indicator lines at bottom */}
                      <div className="mt-auto flex flex-col gap-0.5">
                        {day.hasOutfit && (
                          <div className="w-full h-0.5 md:h-1 rounded-full bg-primary" />
                        )}
                        {day.hasEvent && (
                          <div className="w-full h-0.5 md:h-1 rounded-full bg-muted-foreground/40" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap items-center gap-4 mb-6 text-xs text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-1 rounded-full bg-primary" />
                  <span>Outfit Planned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-1 rounded-full bg-muted-foreground/40" />
                  <span>Event Scheduled</span>
                </div>
              </motion.div>

              {/* Upcoming Events Section */}
              {upcomingEvents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card-elevated p-4 md:p-5"
                >
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Upcoming Events
                  </h3>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => {
                      const eventOutfit = event.outfitPlanned && event.outfitId
                        ? mockOutfits.find(o => o.id === event.outfitId)
                        : null;
                      const outfitItems = eventOutfit
                        ? mockItems.filter(item => eventOutfit.items.includes(item.id))
                        : [];

                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          onClick={() => handleEventClick(event)}
                          className="p-4 rounded-xl bg-muted/20 hover:bg-muted/40 border border-border cursor-pointer transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <CalendarIcon className="w-4 h-4 text-primary flex-shrink-0" />
                                <h4 className="font-semibold text-foreground truncate">
                                  {event.title}
                                </h4>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {formatEventDate(event.date)} {event.time && `• ${event.time}`}
                              </p>

                              {/* Outfit info */}
                              {event.outfitPlanned && eventOutfit ? (
                                <div className="mt-3 flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20">
                                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-primary">
                                      {eventOutfit.title}
                                    </p>
                                    <div className="flex gap-1 mt-1">
                                      {outfitItems.slice(0, 3).map((item) => {
                                        const bgGradient = item.colors.length > 1
                                          ? `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`
                                          : item.colors[0];
                                        return (
                                          <div
                                            key={item.id}
                                            className="w-5 h-5 rounded border border-white/20"
                                            style={{ background: bgGradient }}
                                            title={item.name}
                                          />
                                        );
                                      })}
                                      {outfitItems.length > 3 && (
                                        <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                                          <span className="text-[8px] font-medium">
                                            +{outfitItems.length - 3}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-3 flex items-center gap-2 p-2 rounded-lg bg-accent/10 border border-dashed border-accent/30">
                                  <AlertCircle className="w-4 h-4 text-accent flex-shrink-0" />
                                  <span className="text-xs text-muted-foreground">
                                    No outfit planned
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEventClick(event);
                                    }}
                                    className="ml-auto h-6 px-2 text-xs rounded-lg hover:bg-accent/20"
                                  >
                                    Add Outfit
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="week"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Week View - 2 columns grid */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {weekDays.map((day, index) => (
                  <motion.div
                    key={day.dateStr}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleDayClick(day.date)}
                    className={`
                      card-elevated p-4 cursor-pointer
                      transition-all duration-200 hover:shadow-lg hover:-translate-y-1
                      ${day.isToday ? 'ring-2 ring-primary' : ''}
                    `}
                  >
                    {/* Day header */}
                    <div className="text-center mb-3 pb-3 border-b border-border">
                      <div className="text-xs text-muted-foreground font-medium">
                        {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div
                        className={`text-2xl font-display font-semibold mt-1 ${
                          day.isToday ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {day.date.getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {day.date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>

                    {/* Outfits and Events */}
                    <div className="space-y-2">
                      {day.outfits.length > 0 ? (
                        day.outfits.map((outfit) => (
                          <div
                            key={outfit.id}
                            className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20"
                          >
                            <Shirt className="w-4 h-4 text-primary flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-primary truncate">
                                {outfit.title}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {outfit.items.length} items
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-dashed border-border">
                          <Shirt className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">No outfit</p>
                        </div>
                      )}

                      {day.events.map((event) => (
                        <div
                          key={event.id}
                          className={`flex items-center gap-2 p-2 rounded-lg ${
                            event.outfitPlanned
                              ? 'bg-secondary/60 border border-secondary'
                              : 'bg-accent/10 border border-accent/20'
                          }`}
                        >
                          <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate">{event.title}</p>
                            {event.time && (
                              <p className="text-[10px] text-muted-foreground">{event.time}</p>
                            )}
                          </div>
                          {event.outfitPlanned && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Empty state */}
                    {day.outfits.length === 0 && day.events.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        <p className="text-xs">No plans</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Outfit Planning Modal */}
      <OutfitPlanningModal
        date={selectedDate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(items) => {
          console.log('Saved outfit:', items);
        }}
      />
    </AppLayout>
  );
}
