import { AlertModal } from "@/components";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "식비" | "쇼핑" | "의료" | "생활" | "기타";
type ModalType = "지출" | "스탬프";

export const TestForAlertModalPage = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [modalQueue, setModalQueue] = useState<ModalType[]>([]);
  const [hasFirstExpense, setHasFirstExpense] = useState(false);

  const openExpenseFlow = (value: Category) => {
    setCategory(value);

    if (!hasFirstExpense) {
      setModalQueue(["지출", "스탬프"]);
      setHasFirstExpense(true);
    } else {
      setModalQueue(["지출"]);
    }
  };

  const currentModal = modalQueue[0] ?? null;

  const handleCloseModal = () => {
    setModalQueue((prev) => prev.slice(1));
  };

  return (
    <motion.main
      layout
      className="relative flex h-full w-full flex-col items-center gap-4 bg-black pt-10 text-white"
    >
      <button onClick={() => openExpenseFlow("식비")}>식비</button>
      <button onClick={() => openExpenseFlow("쇼핑")}>쇼핑</button>
      <button onClick={() => openExpenseFlow("의료")}>의료</button>
      <button onClick={() => openExpenseFlow("생활")}>생활</button>
      <button onClick={() => openExpenseFlow("기타")}>기타</button>

      <AnimatePresence mode="popLayout" initial={false}>
        {currentModal === "지출" && category && (
          <motion.div
            key={currentModal}
            layout="position"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
              layout: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <AlertModal
              type="지출"
              value={category}
              onClose={handleCloseModal}
            />
          </motion.div>
        )}

        {currentModal === "스탬프" && (
          <motion.div
            key={currentModal}
            layout="position"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
              layout: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <AlertModal type="스탬프" onClose={handleCloseModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};
