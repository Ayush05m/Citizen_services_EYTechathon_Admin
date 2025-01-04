import { useState } from "react";
import { useQuery } from "react-query";
import { users } from "@/services/usersService";
import UserList from "@/components/users/UserList";
import UserDetails from "@/components/users/UserDetails";
import { User } from "@/types";

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: userList, isLoading } = useQuery("users", users.getAll);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User Management</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <UserList selectedUsers={userList || []} onSelect={setSelectedUser} />
        </div>
        <div>
          {selectedUser && (
            <UserDetails
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
