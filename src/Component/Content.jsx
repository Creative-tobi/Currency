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
              isActive ? "text-pink-500 p-1 font-md bg-white rounded-md" : "text-gray-600"
            }>
            Currency
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/WeatherApi"
            className={({ isActive }) =>
              isActive ? "text-pink-500 p-1 font-md bg-white rounded-md" : "text-gray-600"
            }>
            Weather
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Content;
