import CollapsibleContent from "../../components/CollapsibleContent";
import ScreenContainer from "../../components/ScreenContainer";
import { ProgramInfo } from "../../constants";
import { motion } from "framer-motion";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const FAQ = () => {
  return (
    <ScreenContainer>
      <motion.div
        className={"items-center flex flex-col mt-10 gap-4 pb-10"}
        variants={variants}
        animate={"open"}
      >
        {ProgramInfo.qAndA.map((item, index) => {
          return (
            <CollapsibleContent
              key={index}
              title={item.question}
              className={
                " mx-10 w-[90vw] p-2 rounded-lg flex flex-col items-start border border-green-300 shadow-sm overflow-hidden"
              }
              color={"bg-green-50"}
              activeColor={"bg-gradient-to-r from-green-50 to-green-200"}
            >
              <div
                className={"my-2 pl-2"}
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </CollapsibleContent>
          );
        })}
      </motion.div>
    </ScreenContainer>
  );
};

export default FAQ;
