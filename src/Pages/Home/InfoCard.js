import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const InfoCard = ({ img, cardTitle, cardSub, bgClass }) => {
  return (
    <Card className={`overflow-hidden border-none text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 ${bgClass}`}>
      <CardContent className="p-6 flex items-center gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
          <img src={img} alt={cardTitle} className="h-8 w-8 filter brightness-0 invert" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">{cardTitle}</h3>
          <p className="text-sm text-white/90 font-medium mt-0.5">{cardSub}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;