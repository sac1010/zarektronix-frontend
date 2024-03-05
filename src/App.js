import "./App.css";
import React, { useState, useEffect } from "react";
import SignUpForm from "./components/SignUpForm";

const App = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = () => setOnline(navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center text-center">
      <div>
        {!online && <p className="text-red-500">You are offline.</p>}
        <SignUpForm basicMode={!online} />
      </div>
    </div>
  );
};

export default App;
