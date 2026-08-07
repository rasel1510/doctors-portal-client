import React from 'react';
import { Trash2, Stethoscope } from 'lucide-react';
import { TableRow, TableCell } from '../../components/ui/table';

const DoctorRow = ({ doctor, index, setDeletingDoctor }) => {
  const { name, speciality, departmentName, img, qualification, experience, fee } = doctor;

  return (
    <TableRow>
      <TableCell className="font-semibold text-slate-400">{index + 1}</TableCell>
      <TableCell>
        <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-teal-50 border border-teal-100">
          {img ? (
            <img src={img} alt={name} className="w-full h-full object-cover object-top" />
          ) : (
            <Stethoscope className="h-5 w-5 text-teal-600" />
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="font-bold text-slate-900">Dr. {name}</div>
        <div className="text-[11px] text-slate-400">{doctor.email}</div>
      </TableCell>
      <TableCell>
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100">
          {departmentName || speciality || 'General'}
        </span>
        <div className="text-[11px] text-slate-500 mt-0.5">{qualification || 'MBBS'} · {experience || 5} yrs</div>
      </TableCell>
      <TableCell className="font-bold text-teal-700">৳{fee || 500}</TableCell>
      <TableCell className="text-right">
        <button
          onClick={() => setDeletingDoctor(doctor)}
          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          title="Delete Doctor"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default DoctorRow;