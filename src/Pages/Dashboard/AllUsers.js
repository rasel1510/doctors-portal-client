import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';
import { Table, TableHeader, TableHead, TableBody, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { BASE_URL } from '../../config';

const AllUsers = () => {
  const { data: users, isLoading, refetch } = useQuery('users', () =>
    fetch(`${BASE_URL}/user`, {
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
          <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            All System Users
          </h2>
          <p className="text-xs text-slate-500">Manage user accounts and administrative role permissions</p>
        </div>
        <Badge variant="default" className="text-xs font-semibold px-3 py-1" style={{ background: '#0D9488' }}>
          Total Users: {userList.length}
        </Badge>
      </div>

      {/* Table */}
      {userList.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Users className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No Users Found</h3>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((user, index) => (
              <UserRow
                key={user._id || index}
                user={user}
                index={index}
                refetch={refetch}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AllUsers;