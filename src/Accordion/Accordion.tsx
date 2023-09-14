import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useRef, useState, useCallback } from "react";
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

  const handleDeleteIconClick = useCallback(()=>{
    setShowDialog(true);
  },[])

  const handleDeletePackage = useCallback(() => {
    console.log(id);
    handleDel(id);
    setShowDialog(false);
  }, [id]);


  const handleView = () => {
    console.log(showBody);
    setShowBody((prev) => !prev);
  };

  return (<>
    <div className={styles.accordion}>
      <div className={styles.header}>
        <div className={styles.name}>{name}</div>
        <div className={styles.btn}>
          <FaEye className={styles.icon} onClick={handleView} />
          <MdDelete className={styles.icon} onClick={handleDeleteIconClick} />
        </div>
      </div>
      {showBody && <div className={styles.body}>{reason}</div>}
    </div>
    {
        showDialog && <Dialog handleCancel={()=>{
            setShowDialog(false);
        }}
        handleDelete={handleDeletePackage}
        />
    }
  </>
  );
};

export default Accordion;
