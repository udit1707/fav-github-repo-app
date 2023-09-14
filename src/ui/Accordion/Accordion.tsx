import { useState, useCallback } from "react";

import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import styles from "./Accordion.module.css";
import Dialog from "../Dialog";

interface AccordionProps {
  name?: string;
  reason?: string;
  id: any;
  handleDel: any;
}

const Accordion: React.FC<AccordionProps> = ({
  id,
  name = "",
  reason = "",
  handleDel,
}) => {
  const [showBody, setShowBody] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleDeleteIconClick = useCallback(() => {
    setShowDialog(true);
  }, []);

  const handleDeletePackage = useCallback(() => {
    handleDel(id);
    setShowDialog(false);
  }, [id]);

  const handleBodyView = () => {
    setShowBody((prev) => !prev);
  };

  return (
    <>
      <div className={styles.accordion}>
        <div className={styles.header}>
          <div className={styles.name}>{name}</div>
          <div className={styles.iconCnt}>
            <FaEye className={styles.icon} onClick={handleBodyView} />
            <MdDelete className={styles.icon} onClick={handleDeleteIconClick} />
          </div>
        </div>
        {showBody && <div className={styles.body}>{reason}</div>}
      </div>
      {showDialog && (
        <Dialog
          handleCancel={() => {
            setShowDialog(false);
          }}
          handleDelete={handleDeletePackage}
        />
      )}
    </>
  );
};

export default Accordion;
