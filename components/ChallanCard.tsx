// components/ChallanCard.tsx
import { motion } from 'framer-motion';

interface Challan {
  id: number;
  amount: number;
  reason: string;
  status: string;
}

const ChallanCard = ({ challan }: { challan: Challan }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-bold">Challan #{challan.id}</h3>
      <p>Amount: ${challan.amount}</p>
      <p>Reason: {challan.reason}</p>
      <p>Status: {challan.status}</p>
    </motion.div>
  );
};

export default ChallanCard;
