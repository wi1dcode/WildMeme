import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Footer from "./components/Footer";
import "./App.css";
import SideBar from "./components/SideBar";
import Container from "./components/Container";

export default function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <Container />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
