'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'police'>('user');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      toast.error('User not found');
      return;
    }

    if (data.password !== password) {
      toast.error('Incorrect password');
      return;
    }

    if (data.role !== role) {
      toast.error(`Role mismatch. You are registered as '${data.role}'`);
      return;
    }

    toast.success('Login successful');
    setTimeout(() => {
      if (role === 'user') {
        router.push('/dashboard/user');
      } else {
        router.push('/dashboard/police');
      }
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-blue-100 to-teal-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Login
        </h1>

        <div className="flex flex-col space-y-4 text-black">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'user' | 'police')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
          >
            <option value="user">User</option>
            <option value="police">Police</option>
          </select>
          <Button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
