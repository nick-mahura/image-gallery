import { useState } from "react";
import "../styles.css";
import SearchBar from "../components/SearchBar";
import ImagesGallery from "../components/ImagesGallery";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Image } from "../types";

export default function Home() {
  const [searchResult, setSearchResult] = useState<Image[] | null>(null);
  const favouriteImages = useLocalStorage("favouriteImages", []);
  return (
    <div className="home">
      <SearchBar
        hasFavouriteImages={favouriteImages.length > 0}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
      <div>
        {searchResult && searchResult.length > 0 && (
          <ImagesGallery images={searchResult} />
        )}
      </div>
    </div>
  );
}
