'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Challan {
  id: number;
  amount: number;
  reason: string;
  status: string;
}

const UserDashboard = () => {
  const [challans, setChallans] = useState<Challan[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(parseInt(id));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchChallans(userId);
    }
  }, [userId]);

  const fetchChallans = async (id: number) => {
    const { data, error } = await supabase
      .from('challans')
      .select('*')
      .eq('user_id', id);

    if (error) {
      console.error('Error fetching challans:', error);
    } else {
      setChallans(data || []);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">User Dashboard</h1>

        <div>
          <h2 className="text-2xl font-bold mb-4">Your Challans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challans.map((challan) => (
              <Card key={challan.id}>
                <CardHeader>
                  <CardTitle>Challan #{challan.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Amount: ₹{challan.amount}</p>
                  <p>Reason: {challan.reason}</p>
                  <p>Status: {challan.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
