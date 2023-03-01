import { useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { CiCircleRemove } from "react-icons/ci";
import { BsFullscreen } from "react-icons/bs";
import { useModal } from "../../hooks/useModal";
import { Image } from "../../types";
import styles from "./ImagesGallery.module.css";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function ImagesGallery({
  images,
  favourites
}: {
  images?: Image[];
  favourites?: boolean;
}): JSX.Element {
  const Modal = useModal(document.querySelector("#modal"));
  const [showedImage, setShowedImage] = useState<Image | null>(null);
  const [favouriteImages, setFavouriteImages] = useLocalStorage(
    "favouriteImages",
    []
  );

  function handleAddFavourite(item: Image) {
    if (
      favouriteImages?.find((image: Image) => image.id === item.id)?.length > 0
    )
      return;
    setFavouriteImages((prev: Image[]) => [
      ...prev,
      {
        id: item.id,
        previewURL: item.previewURL,
        largeImageURL: item.largeImageURL
      }
    ]);
  }

  function handleRemoveFavourite(imageId: number) {
    const filtered = favouriteImages.filter(
      (image: Image) => image.id !== imageId
    );

    setFavouriteImages(filtered);
  }

  function handleFullscreen(image: Image) {
    console.log(image);
    setShowedImage(image);
  }

  function handleCloseModal() {
    setShowedImage(null);
  }

  function renderImages(images: Image[] | typeof favouriteImages) {
    return images.map((item: Image) => {
      const favouriteImage = favouriteImages.find(
        (image: Image) => image.id === item.id
      );

      return (
        <div key={item.id} className={styles.image_wrapper}>
          {!favourites && favouriteImage && (
            <div className={styles.favourite_icon}>
              <FcLike size={20} />
            </div>
          )}
          {favourites && (
            <button
              onClick={() => handleRemoveFavourite(item.id)}
              className={styles.remove_favourite_button}
            >
              <CiCircleRemove size={20} color={"#f00"} />
            </button>
          )}
          <img src={item.previewURL} alt="searched" />
          {!favouriteImage && (
            <button
              onClick={() => handleAddFavourite(item)}
              className={styles.favourite_button}
            >
              <FcLikePlaceholder size={20} />
            </button>
          )}
          <button
            onClick={() => handleFullscreen(item)}
            className={styles.fullscreen_button}
          >
            <BsFullscreen size={20} color="#ffffff" />
          </button>
        </div>
      );
    });
  }

  return (
    <div className={styles.gallery}>
      {renderImages(images || favouriteImages)}
      {showedImage && (
        <Modal>
          <div className={styles.fullscreen_wraper}>
            <button onClick={handleCloseModal} className={styles.close_button}>
              x
            </button>
            <img src={showedImage.largeImageURL} alt="fullscreen" />
          </div>
        </Modal>
      )}
    </div>
  );
}
