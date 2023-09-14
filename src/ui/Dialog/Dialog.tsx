import { RxCross2 } from "react-icons/rx";
import styles from "./Dialog.module.css";

interface DialogProps {
  handleDelete: any;
  handleCancel: any;
}

const Dialog: React.FC<DialogProps> = ({ handleDelete, handleCancel }) => {
  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <span className={styles.label}>Are you sure you want to delete?</span>
          <RxCross2 className={styles.cancelIcon} onClick={handleCancel} />
        </div>
        <div className={styles.footer}>
          <button className={styles.cancel} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.delete} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
