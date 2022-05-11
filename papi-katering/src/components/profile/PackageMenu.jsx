import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import HPackageCard from "../card/HPackageCard";

// https://ik.imagekit.io/tvlk/cul-asset/guys1L+Yyer9kzI3sp-pb0CG1j2bhflZGFUZOoIf1YOBAm37kEUOKR41ieUZm7ZJ/cul-assets-252301483284-b172d73b6c43cddb/culinary/asset/REST_823-720x720-FIT_AND_TRIM-546ba62036aeff0535844d034100a061.jpeg?tr=q-40,c-at_max,w-720,h-1280&amp;_src=imagekit

const packages = [
  {
    id: 1,
    image:
      "https://www.expatica.com/app/uploads/sites/5/2014/05/french-food-1920x1080.jpg",
    name: "Paket A",
    price: 30000,
    sold: 28,
    rating: 5,
    reviews: 25,
  },
  {
    id: 2,
    image:
      "https://www.expatica.com/app/uploads/sites/5/2014/05/french-food-1920x1080.jpg",
    name: "Paket B",
    price: 30000,
    sold: 28,
    rating: 5,
    reviews: 25,
  },
];

export default function PackageMenu() {
  return (
    <div className="profile-menu">
      <div className="flex flex-row border-b-2 mb-6">
        <div className="title basis-4/5 text-3xl">Packages</div>
        <Link to="/packet">
          <button className="add basis-1/5 flex flex-row text-lg font-bold items-center justify-end">
            <FaPlus className="fill-emerald-600 mx-1" />
            <p className="text-emerald-600">Add Package</p>
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-6">{packages.map((packet) => <HPackageCard key={packet.id} packet={packet} />)}</div>
    </div>
  );
}
