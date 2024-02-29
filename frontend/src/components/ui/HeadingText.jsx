const HeadingText = ({ text, className }) => {
  return (
    <h1
      className={`display-4 bg-dark-gradient p-2 my-2 rounded-3 text-center ${className}`}
    >
      {text}
    </h1>
  );
};

export default HeadingText;
