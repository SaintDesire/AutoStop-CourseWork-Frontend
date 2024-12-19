export default function ProfileForm() {
    return (
      <div className="formContainer">
        <div className="formGrid">
          <div className="formGroup">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" placeholder="Your First Name" />
          </div>
          <div className="formGroup">
            <label htmlFor="nickName">Nick Name</label>
            <input type="text" id="nickName" placeholder="Your First Name" />
          </div>
          <div className="formGroup">
            <label htmlFor="gender">Gender</label>
            <select id="gender">
              <option>Your Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-Binary</option>
            </select>
          </div>
          <div className="formGroup">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" placeholder="Your Country" />
          </div>
          <div className="formGroup">
            <label htmlFor="language">Language</label>
            <select id="language">
              <option>Your Language</option>
              <option>English</option>
              <option>Russian</option>
              <option>Spanish</option>
            </select>
          </div>
          <div className="formGroup">
            <label htmlFor="timeZone">Time Zone</label>
            <input type="text" id="timeZone" placeholder="Your Time Zone" />
          </div>
        </div>
        <div className="emailBlock">
          <h3>My email Address</h3>
          <p>alexarawles@gmail.com</p>
        </div>
        <button className="editBtn">Edit</button>
      </div>
    );
  }
  