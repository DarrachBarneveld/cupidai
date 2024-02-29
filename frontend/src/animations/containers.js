export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 1 } },
};

export const opacityScaleChild = {
  initial: { opacity: 0, x: -10, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.5, type: "spring", bounce: 0.5 },
  },
};
