import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';
import { Table, TableHeader, TableHead, TableBody, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { BASE_URL } from '../../config';

const AllUsers = () => {
  const { data: users, isLoading, refetch, isFetching } = useQuery(
    'users',
    () =>
      fetch(`${BASE_URL}/user`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then((res) => res.json()),
    {
      staleTime: 0, // Always fetch fresh user list when viewing Admin page
      refetchOnMount: 'always',
    }
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
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-8 text-xs gap-1.5 text-slate-700"
          >
            <RotateCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} /> Refresh Users
          </Button>
          <Badge variant="default" className="text-xs font-semibold px-3 py-1">
            Total Users: {userList.length}
          </Badge>
        </div>
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