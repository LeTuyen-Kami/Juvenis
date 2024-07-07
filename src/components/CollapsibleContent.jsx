import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PlusMinus from "./PlusMinus";

const variants = {
  open: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  closed: {
    opacity: 0,
  },
};

const CollapsibleContent = ({
  title,
  children,
  className,
  color,
  activeColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div
      className={`${className} ${isOpen ? activeColor : color}`}
      initial={{ opacity: 0, x: -300, scale: 0.7 }}
      variants={variants}
      transition={{ duration: 1, type: "spring", stiffness: 300, damping: 30 }}
      key={title}
    >
      <button
        onClick={toggleOpen}
        className={
          "w-full text-left font-bold flex itemcenter gap-2 text-lg justify-between items-center"
        }
      >
        {title}
        <div className={"relative"}>
          <PlusMinus isOpen={isOpen} />
        </div>
      </button>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.button
            key={isOpen + ""}
            initial={{ height: 0, opacity: 0, scale: 0.9 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={"flex flex-col gap-2 text-left"}
            onClick={toggleOpen}
          >
            {children}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CollapsibleContent;
