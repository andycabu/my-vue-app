import PropTypes from "prop-types";

function Button({ text, bg, type, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 rounded-lg  ${bg}`}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
