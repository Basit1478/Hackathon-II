// Test script to verify auth endpoints work correctly
const axios = require('axios');

const API_URL = 'http://localhost:8000';

async function testAuth() {
  console.log('Testing TaskFlow Pro Auth API...\n');

  // Test 1: Signup
  console.log('1. Testing Signup...');
  try {
    const timestamp = Date.now();
    const signupResponse = await axios.post(`${API_URL}/api/auth/signup`, {
      name: 'Test User',
      email: `testuser${timestamp}@example.com`,
      password: 'Test1234',
    });
    console.log('✓ Signup successful');
    console.log('  User ID:', signupResponse.data.user.id);
    console.log('  Token:', signupResponse.data.token.substring(0, 20) + '...');

    const token = signupResponse.data.token;
    const userId = signupResponse.data.user.id;

    // Test 2: Login
    console.log('\n2. Testing Login...');
    const loginResponse = await axios.post(`${API_URL}/api/auth/login`, {
      email: `testuser${timestamp}@example.com`,
      password: 'Test1234',
    });
    console.log('✓ Login successful');
    console.log('  User ID:', loginResponse.data.user.id);
    console.log('  Token:', loginResponse.data.token.substring(0, 20) + '...');

    // Test 3: Create Task (with auth)
    console.log('\n3. Testing Create Task (authenticated)...');
    const taskResponse = await axios.post(
      `${API_URL}/api/${userId}/tasks`,
      {
        title: 'Test Task',
        description: 'This is a test task',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('✓ Task creation successful');
    console.log('  Task ID:', taskResponse.data.id);

    // Test 4: Get Tasks
    console.log('\n4. Testing Get Tasks...');
    const tasksResponse = await axios.get(`${API_URL}/api/${userId}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('✓ Get tasks successful');
    console.log('  Task count:', tasksResponse.data.tasks.length);

    console.log('\n✓ All tests passed!');
  } catch (error) {
    console.error('\n✗ Test failed:');
    if (error.response) {
      console.error('  Status:', error.response.status);
      console.error('  Data:', error.response.data);
    } else {
      console.error('  Error:', error.message);
    }
    process.exit(1);
  }
}

testAuth();
