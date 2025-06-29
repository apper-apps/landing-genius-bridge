import { getRandomDelay } from '@/utils/helpers';

// Mock user database
let users = [
  {
    Id: 1,
    name: "Demo User",
    email: "demo@landinggenius.com",
    wa_number: "081234567890",
    password_hash: "demo123", // In real app, this would be hashed
    token_balance: 15,
    subscription_status: "active",
    created_at: new Date().toISOString()
  }
];

let nextUserId = 2;

export const createUser = async (userData) => {
  await getRandomDelay(800, 1500);

  // Check if email already exists
  const existingUser = users.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('Email sudah terdaftar. Silakan gunakan email lain.');
  }

  // Check if WhatsApp number already exists
  const existingWA = users.find(user => user.wa_number === userData.wa_number);
  if (existingWA) {
    throw new Error('Nomor WhatsApp sudah terdaftar. Silakan gunakan nomor lain.');
  }

  const newUser = {
    Id: nextUserId++,
    name: userData.name,
    email: userData.email,
    wa_number: userData.wa_number,
    password_hash: userData.password, // In real app, this would be hashed
    token_balance: userData.token_balance || 5,
    subscription_status: "active",
    created_at: new Date().toISOString()
  };

  users.push(newUser);
  
  // Return user without password
  const { password_hash, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const loginUser = async (email, password) => {
  await getRandomDelay(500, 1000);

  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error('Email tidak ditemukan. Silakan daftar terlebih dahulu.');
  }

  if (user.password_hash !== password) {
    throw new Error('Password salah. Silakan coba lagi.');
  }

  // Return user without password
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getUserById = async (userId) => {
  await getRandomDelay(200, 500);

  const user = users.find(u => u.Id === userId);
  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  // Return user without password
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const updateUserTokens = async (userId, tokenAmount, type = 'spend') => {
  await getRandomDelay(300, 600);

  const user = users.find(u => u.Id === userId);
  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  if (type === 'spend') {
    if (user.token_balance < tokenAmount) {
      throw new Error('Token tidak cukup. Silakan beli token tambahan.');
    }
    user.token_balance -= tokenAmount;
  } else if (type === 'add') {
    user.token_balance += tokenAmount;
  }

  // Return updated user without password
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getAllUsers = async () => {
  await getRandomDelay(300, 700);
  
  // Return users without passwords
  return users.map(({ password_hash, ...user }) => user);
};