async function test() {
    try {
        const email = 'test_forgot' + Date.now() + '@example.com';
        const password = 'oldpassword123';
        const headers = { 'Content-Type': 'application/json' };
        
        console.log('1. Registering user...');
        const regRes = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST', headers, body: JSON.stringify({ name: 'Test Forgot User', email, password })
        });
        const regData = await regRes.json();
        console.log('Registered:', regData.success);

        console.log('2. Testing verify-email...');
        const verifyRes = await fetch('http://localhost:5000/api/auth/verify-email', {
            method: 'POST', headers, body: JSON.stringify({ email })
        });
        const verifyData = await verifyRes.json();
        console.log('Verified email:', verifyData.success);

        console.log('3. Testing reset-password...');
        const resetRes = await fetch('http://localhost:5000/api/auth/reset-password', {
            method: 'POST', headers, body: JSON.stringify({ email, newPassword: 'newpassword456' })
        });
        const resetData = await resetRes.json();
        console.log('Reset password:', resetData.success);

        console.log('4. Testing login with NEW password...');
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST', headers, body: JSON.stringify({ email, password: 'newpassword456' })
        });
        const loginData = await loginRes.json();
        console.log('Login with new password:', loginData.success);

    } catch (err) {
        console.error('Error:', err.message);
    }
}

test();
