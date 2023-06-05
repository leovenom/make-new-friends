import { useState } from "react";
import Nav from "../components/Nav";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OnBoarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_status: false,
    status_identity: "single",
    status_interest: "relationship",
    email: "",
    url: "",
    about: "",
    matches: [],
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/user`,
        {
          formData,
        }
      );
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);

  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
        setIsSignUp={false}
      />
      <div className="onboarding">
        <h2>Create ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label>Status</label>

            <div className="multiple-input-container">
              <input
                id="single"
                type="radio"
                name="status_identity"
                value="single"
                onChange={handleChange}
                checked={formData.status_identity === "single"}
              />
              <label htmlFor="single">Single</label>
              <input
                id="relationship"
                type="radio"
                name="status_identity"
                value="relationship"
                onChange={handleChange}
                checked={formData.status_identity === "relationship"}
              />
              <label htmlFor="relationship">In a relationship</label>
              <input
                id="more"
                type="radio"
                name="status_identity"
                value="more"
                onChange={handleChange}
                checked={formData.status_identity === "more"}
              />
              <label htmlFor="more">More</label>
            </div>

            <label htmlFor="show-status">Show Status on my Profile</label>
            <div className="multiple-input-container">
              <input
                id="show-status"
                type="checkbox"
                name="show_status"
                onChange={handleChange}
                checked={formData.show_status}
              />
            </div>
            <label>Show Me</label>

            <div className="multiple-input-container">
              <input
                id="single-interest"
                type="radio"
                name="status_interest"
                value="single"
                onChange={handleChange}
                checked={formData.status_interest === "single"}
              />
              <label htmlFor="single-interest">Single</label>
              <input
                id="relationship-interest"
                type="radio"
                name="status_interest"
                value="relationship"
                onChange={handleChange}
                checked={formData.status_interest === "relationship"}
              />
              <label htmlFor="relationship-interest">In a relationship</label>
              <input
                id="everyone-interest"
                type="radio"
                name="status_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.status_interest === "everyone"}
              />
              <label htmlFor="everyone-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
