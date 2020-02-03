import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    padding : 0;
    margin : 0;
  }
`;

interface ButtonTypes {
  danger?: string;
}

const Button = styled.button<ButtonTypes>`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  color: white;
  font-weight: 600;
  -webkit-appearance: none;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "red" : "greenyellow")};
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: silver;
`;

const Achor = styled(Button.withComponent("a"))`
  text-decoration: none;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Button />
        <Button danger="danger" />
        <Achor href="http://google.com">go to google</Achor>
      </Container>
    </>
  );
};

export default App;
