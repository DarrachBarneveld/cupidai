const ErrorMessage = ({ message, subtext = "Please try again later" }) => {
  return (
    <div className="glassmorphism text-center w-fit mx-auto p-2 rounded-3">
      <h2 className="text-danger text-center fw-bolder">{message}</h2>
      <p className="text-dark">{subtext}</p>
    </div>
  );
};

export default ErrorMessage;
