import { Layout } from "antd";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Errors from "./components/Errors";
import Header from "./components/Header";
import CommitDetails from "./pages/CommitDetails";
import Home from "./pages/Home";

function App() {
  const [filterTerm, setFilterTerm] = useState("");

  return (
    <BrowserRouter>
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        <Switch>
          <Route path="/" exact>
            <Header back={false} setFilterTerm={setFilterTerm} />
            <Home filterTerm={filterTerm} />
          </Route>
          <Route
            path="/commit/:oid"
            exact
            render={(route) => (
              <>
                <Header back={true} />
                <CommitDetails oid={route.match.params.oid} />
              </>
            )}
          />
          <Route path="/">
            <Header back={true} />
            <Errors error={"404: Page Not Found"} />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
