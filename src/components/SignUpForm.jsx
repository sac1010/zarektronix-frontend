import axios from "axios";
import React, { useEffect, useState } from "react";

const SignUpForm = ({ basicMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [sentVerification, setSentVerification] = useState(false);
  const [waitForNetwork, setWaitForNetwork] = useState(false);

  useEffect(() => {
    if (!basicMode && waitForNetwork) {
      postData();
    }
  }, [basicMode, waitForNetwork]);

  const postData = async () => {
    try {
      const res = await axios.post(
        "https://zarektronix-backend.onrender.com/api/user/signup",
        formData
      );
      console.log(res, "res");
      sentVerification(true);
    } catch (e) {
      setWaitForNetwork(false);
      console.log(e);
    }
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

  return !waitForNetwork ? (
    <form
      className="w-[500px] bg-white p-8 shadow-xl rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="text-xl font-bold my-5">Sign up</div>
      <label className="block mb-4">
        <input
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
          placeholder="password"
          className="form-input mt-1 h-8 block w-full border border-gray-300 rounded-md px-4"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </label>
      <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
        Submit
      </button>
    </form>
  ) : (
    <div className="">please wait while we handle the rest</div>
  );
};

export default SignUpForm;
