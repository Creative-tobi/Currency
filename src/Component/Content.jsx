import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../Component/ApiStyle.css";

const Content = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-amber-200 font-md bg-white rounded-md" : "text-white"
            }>
            Currency
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/WeatherApi"
            className={({ isActive }) =>
              isActive ? "text-amber-200 font-md bg-white rounded-md" : "text-white"
            }>
            Weather
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Content;
