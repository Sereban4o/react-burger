import React from "react";
import { ingredientType } from "./types";
import PropTypes from "prop-types";

export const DataContext = React.createContext(null);

DataContext.PropTypes = {
  buns: PropTypes.array.isRequired,
  sauce: PropTypes.array.isRequired,
  main: PropTypes.array.isRequired,
  buns: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  sauce: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  main: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
