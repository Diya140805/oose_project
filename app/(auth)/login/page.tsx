// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'police'>('user');
  const router = useRouter();

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password' && role === 'user') {
      router.push('/dashboard/user');
    } else if (email === 'police@example.com' && password === 'password' && role === 'police') {
      router.push('/dashboard/police');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <div className="flex flex-col space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'user' | 'police')}
            className="px-4 py-2 border rounded"
          >
            <option value="user">User</option>
            <option value="police">Police</option>
          </select>
          <Button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
