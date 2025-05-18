// components/LicenseCard.tsx
import { motion } from 'framer-motion';

interface License {
  id: number;
  license_number: string;
  expiry_date: string;
  status: string;
}

const LicenseCard = ({ license }: { license: License }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-bold">{license.license_number}</h3>
      <p>Expiry Date: {license.expiry_date}</p>
      <p>Status: {license.status}</p>
    </motion.div>
  );
};

export default LicenseCard;
