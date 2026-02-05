"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar as BigCalendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppLayout } from '@/components/layout/AppLayout';
import { OutfitPlanningModal } from '@/components/calendar/OutfitPlanningModal';
import { mockOutfits } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

export default function CalendarPage() {
  const [view, setView] = useState<View>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert mock outfits to calendar events
  const events: CalendarEvent[] = useMemo(() => {
    return mockOutfits.map((outfit) => ({
      id: outfit.id,
      title: outfit.title || `${outfit.items.length} items`,
      start: new Date(outfit.date),
      end: new Date(outfit.date),
      allDay: true,
    }));
  }, []);

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedDate(event.start);
    setIsModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-8 pb-24 md:pb-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Outfit Calendar
          </h1>

          {/* View toggle */}
          <div className="flex gap-2">
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              onClick={() => setView('month')}
              className={`h-10 px-4 rounded-xl text-sm font-medium ${
                view === 'month'
                  ? 'bg-primary text-primary-foreground'
                  : 'border-border hover:bg-muted'
              }`}
            >
              Month
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              onClick={() => setView('week')}
              className={`h-10 px-4 rounded-xl text-sm font-medium ${
                view === 'week'
                  ? 'bg-primary text-primary-foreground'
                  : 'border-border hover:bg-muted'
              }`}
            >
              Week
            </Button>
          </div>
        </motion.header>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated p-4"
        >
          <BigCalendar
            localizer={localizer}
            events={events}
            view={view}
            onView={setView}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            style={{ height: 'calc(100vh - 280px)', minHeight: 500 }}
            popup
            views={['month', 'week']}
            eventPropGetter={() => ({
              style: {
                backgroundColor: 'hsl(12 45% 55%)',
                borderRadius: '8px',
                border: 'none',
                padding: '2px 8px',
              },
            })}
          />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mt-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Planned outfit</span>
          </div>
          <span>-</span>
          <span>Click any date to plan an outfit</span>
        </motion.div>
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
