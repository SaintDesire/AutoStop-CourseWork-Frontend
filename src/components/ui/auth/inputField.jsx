const InputField = ({ type, label }) => {
    return (
      <div className="placeholder-container">
        <input type={type} placeholder=" " />
        <label>{label}</label>
      </div>
    );
  };
  
  export default InputField;
  