import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

function App() {
  // const [isLoading, setLoading] = useState(true); // TODO make <content__items> check for skeleton or PizzaBlock

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          {/* <Home /> */}
          <NotFound />
        </div>
      </div>
    </div>
  );
}

export default App;
