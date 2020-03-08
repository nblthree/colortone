import React, { useState } from 'react';
import styled from 'styled-components';
import { MaterialPicker } from 'react-color';
import colortone from '@marchworks/colortone';

const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: black;
`;

const Port = styled.div`
  width: 100%;
  padding: 10px 5% 10px 5%;
  box-sizing: border-box;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Flex = styled.div`
  width: 100%;
  min-height: 130px;
  display: flex;
  justify-content: center;
  margin: 20px 0 20px 0;
`;

const FlexContainer = styled(Flex)`
  overflow-x: scroll;
  min-height: 0;
  justify-content: start;
`;

const Display = styled.div`
  min-width: 50%;
  height: 100px;
  background-color: ${props => props.bgColor || "#ffffff"};
  display: flex;
`;

const DisplayLoop = styled.div`
  min-width: 150px;
  height: 120px;
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
  height: 130px;
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

  const darker = colortone(color, -ratio)
  const lighter = colortone(color, ratio)
  let oldColorD = color
  let oldColorL = color
  return (
    <Container>
      <Port>
        <Flex>
          <MaterialPicker color={color} onChangeComplete={handleChangeComplete} />
          <RatioInput type="text" defaultValue={ratio} onBlur={handleChange} />
        </Flex>
        <Display bgColor={color}><Span>Original: {color}</Span></Display>
      </Port>
      <Port>
        <Flex>
          <Display bgColor={darker}><Span>Darker: {darker}</Span></Display>
          <Display bgColor={lighter}><Span>Lighter: {lighter}</Span></Display>
        </Flex>
      </Port>
      <Port>
        <FlexContainer>
          <DisplayLoop bgColor={color}><Span>{color}</Span></DisplayLoop>
          {
            (new Array(50).fill(0)).map((v, i) => {
              oldColorD = colortone(oldColorD, -ratio)
              return (<DisplayLoop key={`${i}-d`} bgColor={oldColorD}><Span>{oldColorD}</Span></DisplayLoop>)
            })
          }
        </FlexContainer>
        <FlexContainer>
          <DisplayLoop bgColor={color}><Span>{color}</Span></DisplayLoop>
          {
            (new Array(50).fill(0)).map((v, i) => {
              oldColorL = colortone(oldColorL, ratio)
              return (<DisplayLoop key={`${i}-l`} bgColor={oldColorL}><Span>{oldColorL}</Span></DisplayLoop>)
            })
          }
        </FlexContainer>
      </Port>
    </Container>
  );
}

export default App;
