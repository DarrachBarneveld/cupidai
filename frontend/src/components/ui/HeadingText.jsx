const HeadingText = ({ text, className, subtext }) => {
  return (
    <div className="bg-dark-gradient p-2 my-2 rounded-3 text-center">
      <h1 className={`display-4 ${className}`}>{text}</h1>
      {subtext && (
        <p className="lead text-center text-white subtext">{subtext}</p>
      )}
    </div>
  );
};

export default HeadingText;
