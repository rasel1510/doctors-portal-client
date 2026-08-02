import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';

const DoctorRow = ({ doctor, index, setDeletingDoctor }) => {
  const { name, speciality, img } = doctor;

  return (
    <TableRow>
      <TableCell className="font-semibold text-slate-500">{index + 1}</TableCell>
      <TableCell>
        <Avatar className="h-10 w-10 border border-slate-200 shadow-sm">
          <AvatarImage src={img} alt={name} className="object-cover" />
          <AvatarFallback className="bg-sky-500 text-white font-bold text-xs">
            {name ? name.charAt(0) : 'D'}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-bold text-slate-900">{name}</TableCell>
      <TableCell>
        <Badge variant="secondary" className="text-xs bg-sky-50 text-sky-700 border-sky-100">
          {speciality}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button
          size="sm"
          variant="destructive"
          onClick={() => setDeletingDoctor(doctor)}
          className="h-8 text-xs gap-1"
        >
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default DoctorRow;