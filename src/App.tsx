import React from "react";
import { Component as Dashboard } from "./pages/Dashboard";
import { MainProvider } from "./hooks/index.reducer";
import { Global } from "./styles";

function App() {
  return (
    <>
      <Global />
      <MainProvider>
        <Dashboard />
      </MainProvider>
    </>
  );
}

export default App;
