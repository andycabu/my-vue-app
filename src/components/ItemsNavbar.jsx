import { Link } from "react-router-dom";
import { useScreenWidth } from "../hooks/useScreenWidth";
import PropTypes from "prop-types";

function ItemsNavbar({ navbar, classLink, classLi }) {
  const screenWidth = useScreenWidth();

  return (
    <>
      {navbar.map((item) => (
        <>
          <li key={item.id} className={classLi && classLi}>
            <Link className={classLink && classLink} to={item.href}>
              {item.name}
            </Link>
          </li>
          {screenWidth > 1024 && item.icon && item.icon}
        </>
      ))}
    </>
  );
}

ItemsNavbar.propTypes = {
  navbar: PropTypes.array.isRequired,
  classLink: PropTypes.string,
  classLi: PropTypes.string,
};

export default ItemsNavbar;
