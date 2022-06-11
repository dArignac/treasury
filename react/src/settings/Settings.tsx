import { styled } from "@mui/material/styles";
import React from "react";
import DataBackup from "./DataBackup";
import TmdbLanguage from "./TmdbLanguage";
import TmdbRegion from "./TmdbRegion";

const DivContainer = styled("div")({
  display: "grid",
  gap: "0.5em 0.5em",
  gridTemplateColumns: "repeat(auto-fill, 28em)",
});

const StyledH2 = styled("h2")({
  marginBottom: "0.5em",
  marginTop: "0",
});

export default function Settings() {
  return (
    <>
      <StyledH2>Settings</StyledH2>
      <DivContainer>
        <TmdbRegion />
        <TmdbLanguage />
        <DataBackup />
      </DivContainer>
    </>
  );
}
