import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { getArticles } from "../api";

const Header = () => {
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getArticles()
      .then((response) => {
        if (response && response.data) {
          setTopics(response.data);
        } else {
          setError("Error: Invalid response data");
        }
      })
      .catch((err) => {
        setError(err.response.data);
      });

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
            <Link to="/articles">
              <button>All Articles</button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
