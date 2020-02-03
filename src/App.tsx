import React from "react";
import styled, { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    padding : 0;
    margin : 0;
  }
`;

const awesomeCard = css`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: silver;
`;

const Input = styled.input.attrs({
  required: true
})`
  border: none;
  border-radius: 5px;
  ${awesomeCard}
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Input placeholder="hello" />
      </Container>
    </>
  );
};

export default App;
