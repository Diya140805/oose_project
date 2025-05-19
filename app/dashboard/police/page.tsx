'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Challan {
  id: number;
  user_id: number;
  amount: number;
  reason: string;
  status: string;
}

interface User {
  id: number;
  name: string;
  role: string;
}

const PoliceDashboard = () => {
  const [challans, setChallans] = useState<Challan[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newChallan, setNewChallan] = useState({
    id: null as number | null,
    user_id: '',
    amount: '',
    reason: '',
    status: 'unpaid'
  });

  useEffect(() => {
    fetchChallans();
    fetchUsers();
  }, []);

  const fetchChallans = async () => {
    const { data, error } = await supabase.from('challans').select('*');
    if (error) console.error('Error fetching challans:', error);
    else setChallans(data || []);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, role')
      .eq('role', 'user');
    if (error) console.error('Error fetching users:', error);
    else setUsers(data || []);
  };

  const addChallan = async () => {
    const { data, error } = await supabase
      .from('challans')
      .insert([{
        user_id: parseInt(newChallan.user_id),
        amount: parseFloat(newChallan.amount),
        reason: newChallan.reason,
        status: newChallan.status
      }])
      .select();
    if (error) console.error('Error adding challan:', error);
    else {
      setChallans([...challans, ...data]);
      setNewChallan({ id: null, user_id: '', amount: '', reason: '', status: 'unpaid' });
    }
  };

  const updateChallan = async () => {
    if (newChallan.id === null) return;

    const { data, error } = await supabase
      .from('challans')
      .update({
        user_id: parseInt(newChallan.user_id),
        amount: parseFloat(newChallan.amount),
        reason: newChallan.reason,
        status: newChallan.status
      })
      .eq('id', newChallan.id)
      .select();
    if (error) console.error('Error updating challan:', error);
    else {
      setChallans(challans.map(challan => challan.id === newChallan.id ? data[0] : challan));
      setNewChallan({ id: null, user_id: '', amount: '', reason: '', status: 'unpaid' });
    }
  };

  const deleteChallan = async (id: number) => {
    const { error } = await supabase.from('challans').delete().eq('id', id);
    if (error) console.error('Error deleting challan:', error);
    else {
      setChallans(challans.filter(challan => challan.id !== id));
    }
  };

  const handleEdit = (challan: Challan) => {
    setNewChallan({
      id: challan.id,
      user_id: challan.user_id.toString(),
      amount: challan.amount.toString(),
      reason: challan.reason,
      status: challan.status
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Police Dashboard</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Add/Update Challan</h2>
          <div className="flex flex-col space-y-4">
            {/* User Dropdown */}
            <select
              value={newChallan.user_id}
              onChange={(e) => setNewChallan({ ...newChallan, user_id: e.target.value })}
              className="px-4 py-2 border rounded"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} (ID: {user.id})
                </option>
              ))}
            </select>

            <Input
              type="number"
              placeholder="Amount"
              value={newChallan.amount}
              onChange={(e) => setNewChallan({ ...newChallan, amount: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Reason"
              value={newChallan.reason}
              onChange={(e) => setNewChallan({ ...newChallan, reason: e.target.value })}
            />
            <select
              value={newChallan.status}
              onChange={(e) => setNewChallan({ ...newChallan, status: e.target.value })}
              className="px-4 py-2 border rounded"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
            <Button onClick={newChallan.id === null ? addChallan : updateChallan}>
              {newChallan.id === null ? 'Add Challan' : 'Update Challan'}
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Challans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challans.map((challan) => (
              <Card key={challan.id}>
                <CardHeader>
                  <CardTitle>Challan #{challan.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>User ID: {challan.user_id}</p>
                  <p>Amount: ${challan.amount}</p>
                  <p>Reason: {challan.reason}</p>
                  <p>Status: {challan.status}</p>
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={() => handleEdit(challan)}>Edit</Button>
                    <Button onClick={() => deleteChallan(challan.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PoliceDashboard;
