import { Link } from "react-router-dom";
import ImagesGallery from "../components/ImagesGallery";

export default function Favourites() {
  return (
    <div className="favourites">
      <Link to="/"> {"<"} Home</Link>
      <ImagesGallery favourites={true} />
    </div>
  );
}
