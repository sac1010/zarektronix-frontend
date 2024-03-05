import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = ({ basicMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const [sentVerification, setSentVerification] = useState(false);
  const [waitForNetwork, setWaitForNetwork] = useState(false);

  useEffect(() => {
    if (!basicMode && waitForNetwork) {
      postData();
    }
  }, [basicMode, waitForNetwork]);

  const verifyToken = async () => {
    try {
      const res = axios.get(
        `https://zarektronix-backend.onrender.com/api/user/verify/${token}`
      );
      console.log(res.status);
      toast.success(res.message);
    } catch (e) {
      toast.error("please enter the correct code")
      console.log(e.message);
    }
  };
  const postData = async () => {
    try {
      const res = await axios.post(
        "https://zarektronix-backend.onrender.com/api/user/signup",
        formData
      );
      console.log(res, "res");
      setSentVerification(true);
    } catch (e) {
      toast.error(e.response.data.error);
      console.log(e);
    }
    setWaitForNetwork(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (basicMode) {
      localStorage.setItem("user", formData);
      console.log("Data stored locally:", formData);
      setWaitForNetwork(true);
    } else {
      postData();
      console.log("Data submitted online:", formData);
    }
  };

  return (
    <div className="w-[500px] bg-white p-8 shadow-xl rounded-md">
      {!waitForNetwork && (
        <form className="" onSubmit={handleSubmit}>
          <div className="text-xl font-bold my-5">Sign up</div>
          <label className="block mb-4">
            <input
              disabled={sentVerification}
              placeholder="name"
              className="form-input h-8 mt-1 block w-full border border-gray-300 rounded-md px-4"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="block mb-4">
            <input
              disabled={sentVerification}
              placeholder="email"
              className="form-input mt-1 h-8 block w-full border border-gray-300 rounded-md px-4"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="block mb-4">
            <input
              disabled={sentVerification}
              placeholder="password"
              className="form-input mt-1 h-8 block w-full border border-gray-300 rounded-md px-4"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
          {!sentVerification && (
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
      )}
      {waitForNetwork && <div>Please wait while we handle the rest</div>}
      {sentVerification && !waitForNetwork && (
        <div>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="enter verification code"
            className="form-input h-8 block w-full border border-gray-300 rounded-md px-4 mt-4"
            type="text"
          />
          <button
            onClick={verifyToken}
            className="bg-blue-500 text-white p-2 rounded-md mt-4"
            type="submit"
          >
            verify
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
