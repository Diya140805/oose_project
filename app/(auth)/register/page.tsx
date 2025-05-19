'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabaseClient';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'police'>('user');
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const { error } = await supabase
      .from('users')
      .insert({ name, email, password, role });

    if (error) {
      toast.error(`Registration failed: ${error.message}`);
    } else {
      toast.success('Registration successful!');
      setTimeout(() => router.push('/login'), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Register</h1>
        <div className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'user' | 'police')}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="user">User</option>
            <option value="police">Police</option>
          </select>
          <Button
            onClick={handleRegister}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Register
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
