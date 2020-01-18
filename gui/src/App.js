import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 150px 1fr;
`;

function App() {
  return (
    <Layout>
      <div style={{ backgroundColor: "#000" }}>a</div>
      <div style={{ backgroundColor: "#FFF" }}>b</div>
    </Layout>
  );
}

export default App;
