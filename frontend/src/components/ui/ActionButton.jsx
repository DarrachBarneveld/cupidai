const ActionButton = ({ onClick, text, icon, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="btn btn-light">
      {text} {icon}
    </button>
  );
};

export default ActionButton;
