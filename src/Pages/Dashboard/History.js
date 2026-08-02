import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History as HistoryIcon, Calendar, Stethoscope, CheckCircle2 } from 'lucide-react';

const History = () => {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Treatment History</h2>
          <p className="text-xs text-slate-500">Log of past appointments and medical procedures</p>
        </div>
        <Badge variant="secondary" className="text-xs font-semibold">
          Archived Records
        </Badge>
      </div>

      <div className="space-y-4">
        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 shrink-0">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Teeth Whitening Consultation</h4>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" /> Completed on May 14, 2024
                  </span>
                </div>
              </div>
            </div>
            <Badge variant="success" className="gap-1 text-xs">
              <CheckCircle2 className="h-3.5 w-3.5" /> Procedure Completed
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;