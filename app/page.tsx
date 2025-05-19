'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-blue-100 to-teal-100 text-black px-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-10"
      >
        <motion.h1
          className="text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Challan Management System
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A unified platform for tracking license status and challan records with ease.
        </motion.p>

        <motion.div
          className="flex space-x-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/login">
            <Button className="bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300 shadow-md">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300 shadow-md">
              Register
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-16 max-w-3xl w-full text-left"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center"
          variants={fadeInUp}
        >
          Features
        </motion.h2>
        <ul className="space-y-4 text-gray-800 text-lg px-4">
          {[
            {
              title: 'Unified Platform',
              desc: 'Track license status and challan records in one place.',
            },
            {
              title: 'Accurate License Status',
              desc: 'Check the expiry of licenses and view driver details.',
            },
            {
              title: 'Up-to-Date Challan Records',
              desc: 'Regularly updated challan records for efficient tracking.',
            },
          ].map((feature, i) => (
            <motion.li
              key={i}
              variants={fadeInUp}
              className="bg-white rounded-lg px-4 py-3 shadow hover:shadow-md transition duration-300"
            >
              <strong>{feature.title}:</strong> {feature.desc}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default HomePage;
