export const leftVariants = {
  hidden: {
    x: -150,
    opacity:0
  },
  visible: {
    x: 0,
    opacity:1,
    // transition: {duration:.5,delay:.05}
  },
};
export const rightVariants = {
  hidden: {
    x: 150,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    // transition: { duration: 0.5, delay: 0.05 },
  },
};



export const topVariants = {
    hidden: {
        y: -50,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        // transition: {duration:.5,delay:.05}
    },
};
export const bottomVariants = {
    hidden: {
        y: 50,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        // transition: { duration: 0.5, delay: 0.05 },
    },
};

export const scaleVariants = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    visible: {
        scale: 1,
        opacity: 1,
        // transition: { duration: 0.5, delay: 0.05 },
    },
};