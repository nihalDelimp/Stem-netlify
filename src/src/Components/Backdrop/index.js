import { motion } from "framer-motion"
const Backdrop = ( { children, onClick } ) => (
    <motion.div
        className="modal--background"
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, }}
        exit={{ opacity: 0 }}
    >
        {children}
    </motion.div>
)

export default Backdrop
