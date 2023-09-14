import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import BarLoader from "react-spinners/ClipLoader";
import MasterButton from "../../ui/MasterButton";
import styles from "./AddPackage.module.css";

const AddPackage = () => {
  const [packages, setPackages] = useState<any | null>(null);
  const [selectedOption, setSelectedOption] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [why, setWhy] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeroutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const fetchPackages = () => {
    if (searchQuery.length === 0) return;
    setIsLoading(true);
    const fetchedResult = fetch(
      `https://api.github.com/search/repositories?q=${searchQuery}`
    );
    fetchedResult
      .then((res) => {
        if (res.status === 500) {
          setIsLoading(false);
          alert("API error");
        }
        return res.json();
      })
      .then((res) => {
        if (res.items) {
          setIsLoading(false);
        }
        setPackages(res.items);
      })
      .catch((err) => {
        setSuccess(false);
        setIsLoading(false);
        alert("API error");
      });
  };

  const handleRadioChange = (i: any) => {
    const selectedRepo = {
      id: i.id,
      name: i.name,
    };
    setSelectedOption(selectedRepo);
  };

  const checkDuplicate = (favs: any) => {
    return JSON.parse(favs).some((i: any) => i.name === selectedOption.name);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Select the package!!");
      return;
    }
    if (why?.length === 0) {
      alert("Select Reason");
      return;
    }

    const favs = localStorage.getItem("fav-packages");
    if (favs && checkDuplicate(favs)) {
      alert("Package already exists");
      return;
    }

    const newFav = {
      name: selectedOption.name,
      reason: why,
    };

    const newFavs = favs ? [...JSON.parse(favs), newFav] : [newFav];
    localStorage.setItem("fav-packages", JSON.stringify(newFavs));
    setSuccess(true);
  };

  useEffect(() => {
    if (success) {
      const redirectTimeout = setTimeout(() => {
        navigate("/");
      }, 50);

      return () => clearTimeout(redirectTimeout);
    }
  }, [success]);

  useEffect(() => {
    if (timeroutRef.current) clearTimeout(timeroutRef.current);

    timeroutRef.current = setTimeout(() => {
      fetchPackages();
    }, 500);
  }, [searchQuery]);

  return (
    <div className={styles.addPackage}>
      <div className={styles.add}>
        <span className={styles.searchLabel}>
          Search for Github Repositories
        </span>
        <input
          className={styles.searchInput}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      {isLoading && (
        <BarLoader
          loading={true}
          cssOverride={{
            borderColor: "#6558f5",
            width: "5rem",
            height: "5rem",
          }}
        />
      )}

      {packages?.length > 0 && (
        <div className={styles.fetchedList}>
          {packages?.map((i: any, index: number) => {
            return (
              <div key={index} className={styles.item}>
                <input
                  type="radio"
                  //   name="radio-options"
                  value={i.id}
                  checked={selectedOption?.id === i.id}
                  onChange={() => handleRadioChange(i)}
                />
                <span>{i.name}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.enterWhy}>
        <div className={styles.cnt}>
          <span className={styles.whyLabel}>Why is this your fav?</span>
          <textarea
            value={why}
            onChange={(e) => {
              setWhy(e.target.value);
            }}
          />
        </div>
        {!success && (
          <MasterButton
            name="Submit"
            handleClick={handleSubmit}
            className={styles.submitBtn}
          />
        )}
        {success && (
          <MasterButton name="Success" className={styles.successBtn} />
        )}
      </div>
    </div>
  );
};

export default AddPackage;
