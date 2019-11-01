import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Row } from './styled/Layout';
import { NumberInput } from './styled/Input';

const Spinner = styled.div`
  width: 15px;
  display: block;
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  transition: opacity 0.25s;

  & img {
    width: 10px;
    padding: 2px 5px;
    border-radius: 5px;
  }

  & img:hover {
    cursor: pointer;
  }
`;

const SpinButton = ({ units, val, setVal, min, max, hidden }) => {
  const constrain = (k) => {
    if (isNaN(k)) return 0;
    else return k < min ? min : k > max ? max : k;
  };

  const format = (k) => {
    /* Add 0 in front of single digits */
    const formatted = k < 10 ? '0' + k : '' + k;
    return formatted;
  };

  return (
    <Row>
      <Spinner hidden={hidden}>
        <img
          src="arrow-up.svg"
          alt="Arrow-up"
          onClick={() => setVal(constrain(val + 1))}
        />
        <img
          src="arrow-down.svg"
          alt="Arrow-down"
          onClick={() => setVal(constrain(val - 1))}
        />
      </Spinner>
      <NumberInput
        type="number"
        value={format(val)}
        onChange={(e) => setVal(constrain(parseInt(e.target.value)))}
        onFocus={(e) => e.target.select()}
        disabled={hidden}
      />
      <p>{units}</p>
    </Row>
  );
};

export default SpinButton;
