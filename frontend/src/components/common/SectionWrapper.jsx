import { motion } from "framer-motion";
import { fadeUp } from "../../animations/variants";

const SectionWrapper = ({ children }) => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20"
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;