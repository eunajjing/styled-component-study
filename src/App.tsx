import React from "react";
import styled from "styled-components";

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

const App: React.FC = () => {
  return (
    <Container>
      <Button />
      <Button danger="danger" />
    </Container>
  );
};

export default App;
