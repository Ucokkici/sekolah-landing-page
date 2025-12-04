import { Link } from "react-scroll";
import "./ProfilNavigation.scss";

const ProfilNavigation = () => {
  const navItems = [
    { name: "Profil", target: "profil" },
    { name: "Kurikulum", target: "kurikulum" },
    { name: "Humas", target: "humas" },
    { name: "Kesiswaan", target: "kesiswaan" },
    { name: "Postingan", target: "postingan" },
    { name: "Kontak", target: "kontak" },
  ];

  return (
    <div className="profil-navigation">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.target}
          spy={true}
          smooth={true}
          duration={500}
          className="nav-item"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default ProfilNavigation;
