import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../stores/RootStore';

const UserList: React.FC = observer(() => {
  const { userStore } = useRootStore();

  useEffect(() => {
    userStore.fetchUsers();
  }, [userStore]);


  return (
    <ul>
      {userStore.users
        .map((user) => (
          <li key={user.id}>{user.name} {user.email} {user.role} {user.phone}</li>
        ))}
    </ul>
  );
});

export default UserList;

