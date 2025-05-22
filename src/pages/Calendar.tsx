
import React, { useState } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, addMonths, subMonths } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setMonth(prev => subMonths(prev, 1));
    } else {
      setMonth(prev => addMonths(prev, 1));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-md mx-auto h-screen overflow-y-auto pb-20 relative shadow-2xl bg-white">
        {/* App Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-white">
              <h1 className="text-xl font-bold">Syncly</h1>
            </Link>
          </div>
        </div>

        <div className="p-4">
          <Card className="p-4 border-0 shadow-md mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Calendar</h2>
              <Tabs defaultValue="month">
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {format(month, 'MMMM yyyy')}
              </h3>
              <Button variant="ghost" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                month={month}
                className="rounded-md border shadow"
              />
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">Connect to External Calendars</h3>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> Google Calendar
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> Apple Calendar
                </Button>
              </div>
            </div>
          </Card>
          
          <Link to="/">
            <Button variant="outline" className="w-full">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
