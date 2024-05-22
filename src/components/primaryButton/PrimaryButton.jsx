import styles from "./primaryButton.module.css"

const PrimaryButton = ({children}) => {
  return (
    <button
      className={styles.btn}
    >
      {children}
    </button>
  );
}

export default PrimaryButton