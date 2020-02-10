# `styled-component`

`React` 컴포넌트의 스타일링 모듈 중 하나인 `styled-compoennt`를 배워본 리포. 강의는 노마드 코더의 [`styled-component` 강의](https://www.inflearn.com/course/react-style)를 들었으며, `typescript` 얹어서 시도한 소스로, 강의 순서는 다음과 같다.

[기존 CSS 방식으로 스타일링](https://github.com/eunajjing/styled-component-study/commit/c5161383fa7f179e30e414593b0503cc85a9bc4f)

[반응형 디자인 관련 외부 자료]([https://velog.io/@velopert/react-component-styling#%EB%B0%98%EC%9D%91%ED%98%95-%EB%94%94%EC%9E%90%EC%9D%B8](https://velog.io/@velopert/react-component-styling#반응형-디자인))

## [`styled-component` 추가](https://github.com/eunajjing/styled-component-study/commit/81f2d6af95e76f88d542352bc8cafed66cd7b22c)

```shell
yarn add styled-components
```

> 만약 `typescript`를 사용한다면, 관련 모듈을 함께 설치해주어야 사용이 가능
>
> ```shell
> yarn add -D @types/styled-components
> ```
>
> 해당 모듈의 가독성을 높이기 위해, `vsCode` 에디터의 경우 `vscode-styled-components` 확장 플러그인을 사용하면 코드 하이라이팅 가능

### 모듈 `import`

```javascript
import styled from "styled-components";
```

### 컴포넌트

```javascript
const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: silver;
`;
```

핵심은 백팁 안에 `CSS`를 넣는 것

### 타입스크립트

#### `props` 내려주기

> 타입스크립트의 경우 `interface` 정의가 따로 필요
>
> ```typescript
> interface ButtonTypes {
>   danger?: string;
> }
> ```

##### 컴포넌트 정의

```javascript
const Button = styled.button`
  background-color: ${props => (props.danger ? "red" : "greenyellow")};
`;
```

> `typesciprt` 경우 `props`의 타입 지정을 함께 해준다
>
> ```typescript
> const Button = styled.button<ButtonTypes>`
>   background-color: ${props => (props.danger ? "red" : "greenyellow")};
> `;
> ```

#### `SCSS`처럼 써보기

```javascript
const Button = styled.button`
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "red" : "greenyellow")};
`;
```

### 조합하기

```jsx
import React from "react";
import styled from "styled-components";

const App: React.FC = () => {
  return (
    <Container>
      <Button />
      <Button danger="danger" />
    </Container>
  );
};

export default App;
```

## `createGlobalStyle`

이미 선언되어 있는 스타일(`body`의 마진 패딩 같은)을 재선언할 때 등 이용

### 모듈 `import`

```javascript
import styled, { createGlobalStyle } from "styled-components";
```

### `createGlobalStyle` 지정

```javascript
const GlobalStyle = createGlobalStyle`
  body {
    padding : 0;
    margin : 0;
  }
`;
```

### `적용`

```jsx
const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Button />
        <Button danger="danger" />
      </Container>
    </>
  );
};
```

## 확장

특정 `styled-component`의 속성을 가져와 연장해서 쓰고자 할 때

### `가져오고자하는_컴포넌트_이름.withComponent("태그명")`

```javascript
const Achor = styled(Button.withComponent("a"))`
	/* a 태그에 Button이라는 컴포넌트의 style을 입히겠다는 뜻 */
  text-decoration: none;
`;
```

#### 적용

```jsx
const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Achor href="http://google.com">go to google</Achor>
      </Container>
    </>
  );
};
```

### `CSS`

```javascript
import styled, { css } from "styled-components";
```

`CSS` 문법을 추가적으로 구사 시 쓰임(`mixin`)

#### 예시

```javascript
const awesomeCard = css`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`

const Input = styled.input`
  border-radius: 5px;  
  ${awesomeCard}
`
```

#### 기대하는 바

```javascript
const Input = styled.input`
  border-radius: 5px;  
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`
```

## `styled.태그요소.attr({})`

컴포넌트에 요소를 추가적으로 더할 때 사용

```javascript
const Input = styled.input.attrs({
  required: true
})`
  border: none;
`;
```

#### 적용

```jsx
const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Input placeholder="hello" />
      </Container>
    </>
  );
};
```

#### 기대하는 바

```jsx
const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Input placeholder="hello" required={true}/>
      </Container>
    </>
  );
};
```

## keyframes

`CSS`의 `animation`을 구현할 때 사용한 함수로, `CSS`의 `animation-name`을 대체해서 사용 가능

```javascript
import styled, { css, keyframes } from "styled-components";
```

### 정의

```javascript
const rotation = keyframes`
  from {
    transform : rotate(0deg);
  }
  to {
    transform : rotate(360deg);
  }
`;
```

### 사용

```javascript
const Button = styled.button`
  border-radius: 50px;
  css`animation: ${rotation} 3s linear infinite;`;
`;
```

> ### 원래 쓰이는 방식
>
> #### 정의
>
> ```css
> @keyframes slidein {
>   	from {
>    	 margin-left: 100%;
>    	 width: 300%
>   	}
> 
>   	to {
>    	 margin-left: 0%;
>    	 width: 100%;
>   	}
> }
> ```
>
> #### 사용
>
> ```css
> p {
>   animation-duration: 3s;
>   animation-name: slidein;
> }
> ```

## `ThemeProvider`

전역적으로 사용할 `CSS`를 내려줄 때 사용

### 전역 `CSS` 변수들 선언

`json` 형태로 값을 선언해준 뒤 외부에서 사용 가능하도록 `export`

```javascript
const theme = {
  mainColor: "green",
  dangerColor: "red",
  successColor: "blue"
};

export default theme;
```

### 사용하기

#### `import`

```javascript
import theme from "./theme";
import styled, { ThemeProvider } from "styled-components";
```

#### 내려주기

```jsx
const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div>
          <Form />
        </div>
      </ThemeProvider>
    </>
  );
};

```

위와 같은 방법으로 `theme`를 내려주면,

#### 접근

```javascript
const Button = styled.button`
  border-radius: 30px;
  padding: 25px 15px;
  background-color: ${props => props.theme.successColor};
`;
```

자손들은 모두 `props.theme`로 값에 접근 가능

#### 이어주기

```jsx
const Form = () => {
  return (
    <Card>
      <Button>hello</Button>
    </Card>
  );
};
```

## `Nesting`

부모 컴포넌트 안의 모든 자손 컴포넌트들에게 `CSS`를 적용하고자 할 경우

```javascript
const Container = styled.div`
  ${Card} {
    background-color: blue;
  }
`;
```

이 경우 `Container`라는 컴포넌트의 아래 있는 `Card` 컴포넌트만 배경색이 변경됨을 확인 가능

