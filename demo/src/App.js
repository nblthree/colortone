import React, { useState } from 'react';
import styled from 'styled-components';
import { MaterialPicker } from 'react-color';
import { darken, lighten } from '@marchworks/colortone';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  background-color: black;
`;

const Port = styled.div`
  width: 100%;
  height: ${props => props.height || "40%"};
  padding: 10px 5% 10px 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Flex = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
`;

const Display = styled.div`
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "40%"};
  background-color: ${props => props.bgColor || "#ffffff"};
  display: flex;
`;

const Span = styled.span`
  margin: auto;
  font-size: 1.2rem;
  font-weight: 900;
  color: aliceblue;
  background-color: #00000069;
  padding: 2px 5px 2px 5px;
`;

const RatioInput = styled.input`
  width: 120px;
  max-width: 20%;
  height: 100%;
  padding: 2px 10px 2px 10px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px;
  border-radius: 2px;
  background: rgb(255, 255, 255);
  outline: none;
  border: 0;
  text-align: center;
  font-size: 2rem;
`;

function App() {
  const [color, setColor] = useState("#0000ff")
  const [ratio, setRatio] = useState(0.1) 
  const handleChangeComplete = (color) => {
    setColor(color.hex);
  }
  const handleChange = (event) => {
    const temp = Number(event.target.value)
    if(temp < 0 || temp > 1) return
    setRatio(temp);
  }

  const darker = darken(color, ratio)
  const lighter = lighten(color, ratio)
  return (
    <Container>
      <Port height="50%">
        <Flex>
          <MaterialPicker color={color} onChangeComplete={handleChangeComplete} />
          <RatioInput type="text" defaultValue={ratio} onChange={handleChange} />
        </Flex>
        <Display bgColor={color}><Span>Original: {color}</Span></Display>
      </Port>
      <Port>
        <Flex>
          <Display height="100%" width="50%" bgColor={darker}><Span>Darker: {darker}</Span></Display>
          <Display height="100%" width="50%" bgColor={lighter}><Span>Lighter: {lighter}</Span></Display>
        </Flex>
      </Port>
    </Container>
  );
}

export default App;
