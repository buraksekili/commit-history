import { Layout } from "antd";
import React from "react";
import Home from "./pages/Home";
const { Header } = Layout;

function App() {
  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Header>Header</Header>
      <Home />
    </Layout>
  );
}

export default App;
