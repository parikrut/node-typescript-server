// Credit - https://youtu.be/jD7FnbI76Hg
// Created a Chat App which furthur integrates with current user and typescript

const users: { id: number; username: string; room: string; }[] = [];

// Join user to chat
function userJoin(id: number, username: string, room: string) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id: number) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id: number) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room: string) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
