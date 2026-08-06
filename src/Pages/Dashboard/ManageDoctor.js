import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DoctorRow from './DoctorRow';
import DeleteConfirm from './DeleteConfirm';
import { Table, TableHeader, TableHead, TableBody, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Stethoscope } from 'lucide-react';
import { BASE_URL } from '../../config';

const ManageDoctor = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);

  const { data: doctors, isLoading, refetch } = useQuery('doctors', () =>
    fetch(`${BASE_URL}/doctor`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  const doctorList = Array.isArray(doctors) ? doctors : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Doctors</h2>
          <p className="text-xs text-slate-500">View and remove registered medical specialists</p>
        </div>
        <Badge variant="default" className="text-xs font-semibold px-3 py-1">
          Total Doctors: {doctorList.length}
        </Badge>
      </div>

      {/* Table */}
      {doctorList.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Stethoscope className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No Doctors Registered</h3>
          <p className="text-xs text-slate-500">Use "Add Doctor" tab to register your first doctor.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorList.map((doctor, index) => (
              <DoctorRow
                key={doctor._id || index}
                doctor={doctor}
                index={index}
                refetch={refetch}
                setDeletingDoctor={setDeletingDoctor}
              />
            ))}
          </TableBody>
        </Table>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingDoctor && (
        <DeleteConfirm
          deletingDoctor={deletingDoctor}
          setDeletingDoctor={setDeletingDoctor}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManageDoctor;


