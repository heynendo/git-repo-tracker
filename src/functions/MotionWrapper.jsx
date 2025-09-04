import { motion } from 'framer-motion'

function MotionWrapper({ children }) {
  const pageMotion = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },   
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } }
  }

  return <motion.div {...pageMotion}>{children}</motion.div>
}

export default MotionWrapper