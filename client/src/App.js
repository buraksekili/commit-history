import { Layout } from "antd";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import CommitDetails from "./pages/CommitDetails";
import Home from "./pages/Home";

function App() {
  const [filterTerm, setFilterTerm] = useState("");

  return (
    <BrowserRouter>
      <Switch>
        <Layout style={{ height: "100vh", overflow: "auto" }}>
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
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
