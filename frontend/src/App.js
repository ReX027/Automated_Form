import { useState } from "react";
import axios from "axios";
import "./App.css";
import SignatureCanvas from "react-signature-canvas";

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    creditCardNo: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChecked = (e) => {
    setIsChecked(!isChecked);
  };

  const handleClear = () => {
    sign.clear();
  };
  const handleGenerateSign = () => {
    if (sign) {
      console.log("saved");
      setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sign && !sign.isEmpty()) {
      // If signature is not empty, save it
      handleGenerateSign();
    }
    let data = {
      name: formData.name,
      email: formData.email,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      creditCardNo: formData.creditCardNo,
      signatureImageUrl: url || null,
    };
    try {
      await axios.post("http://localhost:4000/api/user/shipping-form", data);
      console.log("Successful");
      setFormData({
        name: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        creditCardNo: "",
      });
      setIsChecked(false);
      sign.clear();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveButtonClick = (e) => {
    e.preventDefault();
    handleGenerateSign();
  };
  return (
    <div className="wrapper">
      <div className="container">
        <form action="POST" onSubmit={handleSubmit}>
          <h1>
            <i className="fas fa-shipping-fast"></i>
            Shipping Details
          </h1>
          <div className="name">
            <div>
              <label htmlFor="f-name">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="l-name">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="Address">
            <label htmlFor="name">Address</label>
            <input
              type="text"
              name="street"
              required
              value={formData.street}
              onChange={handleChange}
            />
          </div>
          <div className="address-info">
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="zip">Zip</label>
              <input
                type="text"
                name="zip"
                required
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
          </div>
          <h1>
            <i className="far fa-credit-card"></i> Payment Information
          </h1>
          <div className="cc-num">
            <label htmlFor="card-num">Credit Card No.</label>
            <input
              type="text"
              name="creditCardNo"
              required
              value={formData.creditCardNo}
              onChange={handleChange}
            />
          </div>

          <div className="Checkbox">
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                required
                onChange={handleChecked}
              ></input>
              <p>I agree to the terms of service</p>
            </label>
          </div>

          <p>Signature</p>
          <div style={{ border: "1px solid grey", width: 500, height: 100 }}>
            <SignatureCanvas
              canvasProps={{
                width: 500,
                height: 100,
                className: "sigCanvas",
                velocity: 1,
              }}
              ref={(data) => setSign(data)}
            />
          </div>
          <div className="btn">
            <button id="clearbtn" onClick={handleClear}>
              Clear
            </button>
            <button id="savebtn" onClick={handleSaveButtonClick}>
              Save
            </button>
          </div>
          <div className="btns">
            <button type="submit">Purchase</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
