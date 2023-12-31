import classNames from "classnames";

import styles from "./MasterButton.module.css";

interface MasterButtonProps {
  name: string;
  className?: any;
  handleClick?: any;
}

const MasterButton: React.FC<MasterButtonProps> = ({
  name,
  handleClick = () => {},
  className = null,
}) => {
  return (
    <button
      onClick={handleClick}
      className={classNames(styles.masterBtn, { [className]: className })}
    >
      {name}
    </button>
  );
};

export default MasterButton;
