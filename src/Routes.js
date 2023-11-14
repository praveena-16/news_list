import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";

const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Navigate to="/404" />} />
  </Routes>
);

export default routes;
