import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Service = ({ service }) => {
  return (
    <Card className="group h-full border-slate-100 hover:border-sky-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
      <CardHeader className="items-center pt-8 pb-4 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-sky-50 p-4 group-hover:bg-sky-100/80 transition-colors">
          <img src={service.img} alt={service.name} className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-300" />
        </div>
        <CardTitle className="text-xl font-bold text-slate-800 mt-4 group-hover:text-sky-600 transition-colors">
          {service.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center pb-8">
        <p className="text-sm text-slate-600 leading-relaxed">
          {service.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default Service;