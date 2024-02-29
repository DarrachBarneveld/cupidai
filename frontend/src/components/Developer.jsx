const Developer = ({ name, description, src, link }) => {
  return (
    <div className="glassmorphism">
      <h3>{name}</h3>
      <h4>{description}</h4>
      <img src={src} alt="image of Kiki" />
      <a
        href={link}
        target="_blank"
        rel="noopener"
        aria-label="Connect in Github (Opens in a new tab)"
      >
        <i className="fa-brands fa-github"></i>
      </a>
    </div>
  );
};

export default Developer;
