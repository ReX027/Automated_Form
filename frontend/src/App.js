import { useState } from "react";
import axios from "axios";
import "./App.css";
import SignatureCanvas from "react-signature-canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleClear = (e) => {
    e.preventDefault();
    if (!sign.isEmpty()) {
      toast.success("Signature Cleared!");
      sign.clear();
      setUrl("");
    }
  };

  const handleGenerateSign = () => {
    if (sign && !sign.isEmpty()) {
      toast.success("Signature Saved");
      setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.zip.length !== 6) {
      toast.error("Please enter valid zip code");
      return;
    }

    if (!url) {
      toast.error("Please save your E-sign");
      return;
    }

    if (sign && !sign.isEmpty() && url) {
      toast.success("Payment is processing");
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
      const res = await axios.post(
        "http://localhost:4000/api/user/shipping-form",
        data
      );
      // console.log("Successful");
      setFormData({
        name: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        creditCardNo: "",
      });
      if (res.data.success) {
        toast.success("Payment successful");
      }
      setIsChecked(false);
      sign.clear();
    } catch (error) {
      toast.error("Server error please fill again");
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
          <h1 className="H1textForSmallscreen">Shipping Details</h1>
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
          <h1 className="H1textForSmallscreen">Payment Information</h1>
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

          <p className="Signature">
            <label>Signature</label>
          </p>
          <div
            style={{
              border: "1px solid grey",
              maxWidth: 500,
              maxHeight: 100,
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
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
      <ToastContainer />
    </div>
  );
}
export default App;
