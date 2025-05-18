// components/LicenseCard.tsx
import { motion } from 'framer-motion';

const LicenseCard = ({ license }: { license: any }) => {
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
