import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Arrow({ left, right, title }) {
  return (
    <div className=" container flex justify-between items-center gap-8 ">
      <Link className="arrows" to={left.link}>
        <span className="arrow left"></span>
        {left.text}
      </Link>
      {title ? <h1>{title}</h1> : null}
      {right ? (
        <Link className="arrows" to={right.link}>
          {right.text}
          <span className="arrow right"></span>
        </Link>
      ) : null}
    </div>
  );
}

Arrow.propTypes = {
  title: PropTypes.string,
  left: PropTypes.shape({
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  right: PropTypes.shape({
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

export default Arrow;
