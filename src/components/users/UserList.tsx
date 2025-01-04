import { userApiResponse } from "@/services/usersService";
import { User } from "@/types";
import { format } from "date-fns";

interface UserListProps {
  // selectedUsers: {
  //   users: User[];
  //   pagination: { total: number; page: number; pages: number };
  // };
  selectedUsers: userApiResponse | never[];
  onSelect: (user: User) => void;
}

export default function UserList({ selectedUsers, onSelect }: UserListProps) {
  console.log(selectedUsers);
  const users = Array.isArray(selectedUsers) ? [] : selectedUsers.users;
  // const users = {};
  console.log(users);
  

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {Array.isArray(users) &&
          users.map((user) => (
            <li
              key={user.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect(user)}
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-indigo-600">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.documents.length} Documents
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {user.profile.location}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Joined {format(new Date(user.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        {!users && <p>No users found</p>}
      </ul>
    </div>
  );
}
