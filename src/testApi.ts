import { fetchUsers } from './services/userApi';

export const testFetch = async () => {
  try {
    console.log('Testing API fetch...');
    const users = await fetchUsers(3);
    
    console.log('✅ Fetch successful!');
    console.log('Number of users:', users.length);
    console.log('First user:', users[0]);
    console.log('User structure check:');
    console.log('- UUID:', users[0].uuid);
    console.log('- Name:', users[0].name.first, users[0].name.last);
    console.log('- Avatar:', users[0].picture.thumbnail);
    
    return users;
  } catch (error) {
    console.error('❌ Fetch failed:', error);
    throw error;
  }
};