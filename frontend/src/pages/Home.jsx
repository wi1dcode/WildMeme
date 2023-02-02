import React from "react";
import Container from "../components/Container";
import Generate from "../components/Generate";
import MemeList from "../components/MemeList";
import MenuButton from "../components/MenuButton";

export default function Home() {
  return (
    <>
      <MenuButton />
      <Container>
        <Generate />
        <MemeList />
      </Container>
    </>
  );
}
