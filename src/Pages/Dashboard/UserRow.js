import React from 'react';
import { toast } from 'react-toastify';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, User, UserX } from 'lucide-react';

const UserRow = ({ user, index, refetch }) => {
  const { email, role } = user;

  const makeAdmin = () => {
    fetch(`https://doctors-portal-server-psi.vercel.app/user/admin/${email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error('Failed to make admin. Unauthorized action.');
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`Successfully promoted ${email} to Admin!`);
        }
      });
  };

  return (
    <TableRow>
      <TableCell className="font-semibold text-slate-500">{index + 1}</TableCell>
      <TableCell className="font-medium text-slate-900 flex items-center gap-2">
        <User className="h-4 w-4 text-slate-400" />
        <span>{email}</span>
      </TableCell>
      <TableCell>
        {role === 'admin' ? (
          <Badge variant="default" className="gap-1 text-xs bg-sky-500">
            <ShieldCheck className="h-3 w-3" /> Admin
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-xs">
            User
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        {role !== 'admin' && (
          <Button size="sm" variant="outline" onClick={makeAdmin} className="h-8 text-xs gap-1 border-sky-200 text-sky-700 hover:bg-sky-50">
            <ShieldCheck className="h-3.5 w-3.5" /> Make Admin
          </Button>
        )}
      </TableCell>
      <TableCell className="text-right">
        <Button size="sm" variant="ghost" className="h-8 text-xs text-red-500 hover:bg-red-50 hover:text-red-600">
          <UserX className="h-3.5 w-3.5 mr-1" /> Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;