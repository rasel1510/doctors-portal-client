import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CalendarCheck, Tag } from 'lucide-react';

const Service = ({ service, setTreatment }) => {
  const { name, slots, price } = service;
  const isAvailable = slots && slots.length > 0;

  return (
    <Card className="h-full flex flex-col justify-between border-slate-100 shadow-sm hover:shadow-lg transition-all duration-200">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-bold text-slate-800">
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-center space-y-3 pb-6">
        {/* Time slot hint */}
        <div className="flex items-center justify-center gap-1.5 text-sm text-slate-600">
          <Clock className="h-4 w-4 text-sky-500" />
          <span>
            {isAvailable ? slots[0] : "No slots available today"}
          </span>
        </div>

        {/* Space availability badge */}
        <div>
          <Badge variant={isAvailable ? "default" : "destructive"}>
            {slots.length} {slots.length === 1 ? 'Space' : 'Spaces'} Available
          </Badge>
        </div>

        {/* Price tag */}
        {price !== undefined && (
          <div className="flex items-center justify-center gap-1 text-sm font-semibold text-slate-700">
            <Tag className="h-3.5 w-3.5 text-emerald-600" />
            <span>Price: ${price}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          disabled={!isAvailable}
          onClick={() => setTreatment(service)}
          className="w-full gap-2"
        >
          <CalendarCheck className="h-4 w-4" />
          {isAvailable ? "Book Appointment" : "Fully Booked"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Service;
