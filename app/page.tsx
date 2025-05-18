// app/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8"
      >
        <h1 className="text-4xl font-bold mb-4">Challan Management System</h1>
        <p className="text-xl mb-8">
          A unified platform for tracking license status and challan records.
        </p>

        <div className="flex space-x-4 justify-center">
          <Link href="/login">
            <Button className="bg-white text-blue-500 hover:bg-gray-100">
              Login
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-white text-blue-500 hover:bg-gray-100">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside text-left">
          <li className="mb-2">
            <strong>Unified Platform:</strong> Track license status and challan records in one place.
          </li>
          <li className="mb-2">
            <strong>Accurate License Status:</strong> Check the expiry of licenses and view driver details.
          </li>
          <li className="mb-2">
            <strong>Up-to-Date Challan Records:</strong> Regularly updated challan records for efficient tracking.
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default HomePage;
