import React from "react";
import { Route, Routes } from "react-router-dom";
import Apointment from "./Pages/Apointment";
import Home from "./Pages/Home";
import { Wrapper } from "./styles.App";

function App() {
  return (
    <>
      <Wrapper className="App">
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/apointment/year/:id/month/:id"
              element={<Apointment />}
            />
          </Routes>
        </div>
      </Wrapper>
    </>
  );
}

export default App;
