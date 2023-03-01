import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import axios from "axios";
import styles from "./SearchBar.module.css";
import { Image } from "../../types";

export default function SearchBar({
  searchResult,
  setSearchResult,
  hasFavouriteImages
}: {
  searchResult: Image[];
  setSearchResult: (images: Image[]) => void;
  hasFavouriteImages: boolean;
}): JSX.Element {
  const [formValue, setFormValue] = useState<string>("");

  function handleSubmit(e: FormEvent) {
    if (formValue === "") return;
    e.preventDefault();
    axios
      .get(
        `https://pixabay.com/api/?key=4244891-cb19c9d7a89eb1607146d5f22&q=${formValue}&image_type=photo&pretty=true`
      )
      .then(function (response) {
        console.log(response.data);
        setSearchResult(response.data.hits);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValue(e.target.value);
  }

  return (
    <div
      className={cn(styles.searchbar, {
        [styles.shrinked]: searchResult && searchResult.length > 0
      })}
    >
      <form onSubmit={handleSubmit}>
        <input
          className={styles.textinput}
          type="text"
          value={formValue}
          onChange={handleChange}
        />
        <button className={styles.submitinput} type="submit">
          Search
        </button>
        {hasFavouriteImages && (
          <Link to="favourites">
            <a className={styles.favourites_link}>Favourites</a>
          </Link>
        )}
      </form>
    </div>
  );
}
