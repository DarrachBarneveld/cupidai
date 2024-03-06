const HeadingText = ({ text, className, subtext }) => {
  return (
    <div className="bg-dark-gradient p-2 my-2 rounded-3 text-center">
      <h1 className={`heading-text ${className}`}>{text}</h1>
      {subtext && (
        <em className="lead text-center text-white subtext border-bottom">
          {subtext}
        </em>
      )}
    </div>
  );
};

export default HeadingText;
