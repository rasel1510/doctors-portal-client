import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';
import { Table, TableHeader, TableHead, TableBody, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const AllUsers = () => {
  const { data: users, isLoading, refetch } = useQuery('users', () =>
    fetch('https://doctors-portal-server-psi.vercel.app/user', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  const userList = Array.isArray(users) ? users : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
          <p className="text-xs text-slate-500">Manage user accounts and admin permissions</p>
        </div>
        <Badge variant="default" className="text-xs font-semibold px-3 py-1">
          Total Users: {userList.length}
        </Badge>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Current Role</TableHead>
            <TableHead className="text-right">Admin Access</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((user, index) => (
            <UserRow key={user._id || index} user={user} index={index} refetch={refetch} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUsers;