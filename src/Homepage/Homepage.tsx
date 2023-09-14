import { useEffect, useRef, useState } from "react";
import MasterButton from "../MasterButton";
import styles from "./Homepage.module.css";
import Accordion from "../Accordion";
import { Link } from "react-router-dom";

const Homepage = ({}) => {
  const [favs, setFavs] = useState<any[] | null>(null);

  const fetchFavs = () => {
    console.log(localStorage.getItem("fav-packages"));

    const storedData = localStorage.getItem("fav-packages");

    if (storedData !== null) {
      const pkgs = JSON.parse(storedData);

      if (Array.isArray(pkgs) && pkgs.length > 0) {
        setFavs(pkgs);
      }
    }
  };

  useEffect(() => {
    fetchFavs();
  }, []);

  console.log(favs);

  const handleDel = (id: any) => {
    console.log("delete", favs, id);
    setFavs((favs: any) => {
      if (favs) {
        const newFavs = favs.filter((i: any, index: any) => index !== id);
        localStorage.setItem("fav-packages", JSON.stringify(newFavs));
        return newFavs;
      }
    });
  };

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div className={styles.title}> Welcome to Favorite Github Repositories</div>
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
