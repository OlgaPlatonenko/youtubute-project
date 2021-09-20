import { v4 as uuidV4 } from 'uuid';

import users from './users.json';

export function login(data) {
  const user = users.find(u => u.username === data.username);

  if (user && user.password === data.password) {
    return {
      username: user.username,
      token: uuidV4(),
    };
  }

  return null;
}

export function getUser() {
  return users[0];
}
