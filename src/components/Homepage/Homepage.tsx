import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import Accordion from "../../ui/Accordion";
import MasterButton from "../../ui/MasterButton";
import styles from "./Homepage.module.css";

const Homepage = ({}) => {
  const [favs, setFavs] = useState<any[] | null>(null);

  const fetchFavs = () => {
    const storedData = localStorage.getItem("fav-packages");

    if (!storedData) return;

    const pkgs = JSON.parse(storedData);

    if (Array.isArray(pkgs) && pkgs.length > 0) {
      setFavs(pkgs);
    }
  };

  const handleDel = (id: any) => {
    setFavs((favs: any) => {
      if (favs) {
        const newFavs = favs.filter((i: any, index: any) => index !== id);
        localStorage.setItem("fav-packages", JSON.stringify(newFavs));
        return newFavs;
      }
    });
  };

  useEffect(() => {
    fetchFavs();
  }, []);

  return (
    <div className={classNames(styles.home, {[styles.homeNoFavs]: !favs || favs?.length === 0})}>
      <div className={styles.header}>
        <div className={styles.title}>
          {" "}
          Welcome to Favorite Github Repositories
        </div>
        <Link to="/add-package">
          <MasterButton name="Add Fav" className={styles.btn} />
        </Link>
      </div>
      {favs && favs.length > 0 ? (
        <div className={styles.favContainer}>
          {favs.map((i: any, index: any) => (
            <Accordion
              key={index}
              id={index}
              handleDel={handleDel}
              name={i.name}
              reason={i.reason}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noFav}>
          You don't have any favs yet. Please add.
        </div>
      )}
    </div>
  );
};

export default Homepage;
