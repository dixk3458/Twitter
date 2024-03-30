let users = [
  {
    id: '1',
    username: 'dohyeong1521',
    password: '$2b$12$CWJdcbBhbwrBiMiDL2F0EOwWzYgDZyoQHZWPW8jOZfoEx.eRvDg7u', // skaehgud1521@
    email: 'skaehgud1521@naver.com',
    url: 'https://images.unsplash.com/photo-1707343846292-0c11438d145f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
  },
];

export async function findByUsername(username) {
  return users.find(user => user.username === username); // 고유 id를 포함한 user 객체 반환
}

export async function findById(id) {
  return users.find(user => user.id === id);
}
export async function createUser(user) {
  // user객체를 받아서(고유 id 없는) 고유 id를 생성후 배열에 추가
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id; //그 유저의 고유 id 반환
}
