import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";

const Header = () => {
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div className="error">{error}</div>;

  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="header">
        <div className="logo-container">
          <img
            className="logo-main"
            src="src/assets/NCNews-logo-white.png"
            alt="NC News Logo"
          />
        </div>

        <div className="date">
          <h3>{formattedDate}</h3>
        </div>

        <div className="buttons-container">
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/users">
              <button>Users</button>
            </Link>
            <Link to="/">
              <button>All Articles</button>
            </Link>
            <Link to="/topics">
              <button>Topics</button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
