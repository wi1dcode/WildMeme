import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./services/userContext"

import Home from "./pages/Home";

import Footer from "./components/Footer";
import "./App.css";
import SideBar from "./components/SideBar";
import Container from "./components/Container";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import Memes from "./pages/Memes";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <SideBar />
        <Container />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memes" element={<Memes />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContextProvider>
  );
}
