import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { Font } from './Global';
import { Row } from './Layout';

const Icon = styled.img`
  margin-left: auto;
  width: 19px;
  height: 19px;
`;

const Shared = css`
  ${Font}

  margin: 5px;
  padding: 8px;
  background-color: ${(props) => (props.disabled ? '#fff' : '#eee')};
  border: none
  border-bottom: 2px solid transparent;
  border-radius: 5px;
  transition: border-color 0.2s, border-radius 0.1s, all 0.3s;

  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'text')};
  }

  &:focus {
    outline-style: none;
  }
`;

const BaseNumberInput = styled.input`
  ${Shared}

  padding: 5px;
  height: 20px;
  width: 25px;
  border: none;
  border-radius: 10px;
  text-align: center;

  /* Hide spin buttons */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

const WrappedDropdown = styled.div`
  & .content {
    display: grid;
    grid-template-columns: 50px 50px 50px;
    background-color: #fff;
    position: absolute;
    visibility: hidden;
    margin-top: -3px;
    margin-left: -50px;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.25s;
  }

  & .content div {
    padding: 5px;
  }

  & .content div:hover {
    background-color: #eee;
  }

  & .content div:first-of-type {
    border-radius: 10px 0 0 0;
  }

  & .content div:nth-of-type(3) {
    border-radius: 0 10px 0 0;
  }

  & .content div:nth-of-type(10) {
    border-radius: 0 0 0 10px;
  }

  & .content div:last-of-type {
    border-radius: 0 0 10px 0;
  }

  &:hover .content {
    visibility: ${(props) => (props.disabled ? 'hidden' : 'visible')};
    opacity: 1;
  }
`;

export const NumberInput = (props) => {
  return (
    <WrappedDropdown disabled={props.disabled}>
      <BaseNumberInput {...props} />
      <div className="content">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num}>{num}</div>
        ))}
        <div>
          <Icon src="close.svg" />
        </div>
        <div>0</div>
        <div>
          <Icon src="check.svg" />
        </div>
      </div>
    </WrappedDropdown>
  );
};

export const TextArea = styled.textarea`
  ${Shared}

  width: 90%;
  resize: ${(props) => (props.disabled ? 'none' : 'vertical')};

  &:focus {
    border-bottom: 2px solid #5187ed;
    border-radius: 5px 5px 0px 0px;
  }
`;

const Input = styled.input`
  ${Shared}

  width: 90%;

  &:focus {
    border-bottom: 2px solid #5187ed;
    border-radius: 5px 5px 0px 0px;
  }
`;

const DD = styled.div`
  ${Shared}

  width: 90%;
  margin: 5px auto;
  text-align: left;

  & .content {
    margin-top: 6px;
    margin-left: -8px;
    position: absolute;
    width: 77%;
    max-height: ${(props) =>
      !props.disabled && !props.closed ? '300px' : '0'};
    opacity: ${(props) => (!props.disabled && !props.closed ? '1' : '0')};
    overflow: auto;
    background-color: #fff;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
  }

  & .content p {
    margin: 0;
    padding: 10px 15px;
  }

  & .content p:first-of-type {
    border-radius: 10px 10px 0 0;
  }

  & .content p:last-of-type {
    border-radius: 0 0 10px 10px;
  }

  & .content p:hover {
    background-color: #f5f5f5;
  }

  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }
`;

export const Dropdown = ({ selected, onSelect, options, disabled }) => {
  const [closed, setClosed] = useState(true);
  return (
    <DD
      disabled={disabled}
      closed={closed}
      onMouseOver={() => setClosed(false)}
      onMouseLeave={() => setClosed(true)}
    >
      <Row>
        {selected}
        {disabled ? (
          ''
        ) : (
          <Icon src={closed ? 'arrow-down.svg' : 'arrow-up.svg'} />
        )}
      </Row>
      <div className="content">
        <p style={{ textAlign: 'center' }}>
          <Icon src={'add.svg'} /> Add Category
        </p>
        {options.map((option) => (
          <p
            key={option}
            onClick={() => {
              onSelect(option);
              setClosed(true);
            }}
          >
            {option}
          </p>
        ))}
      </div>
    </DD>
  );
};

const DateInput = styled.input`
  ${Shared}

  width: 100%;

  &::-webkit-clear-button,
  &::-webkit-inner-spin-button {
    display: none;
  }

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
`;

// const DateStyled = styled(DatePicker)`
//   .react_datepicker__input-container input {
//     border: none;
//     color: red;
//   }
// `;

const DateWrapper = styled.div`
  & .content {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(7, auto);
    visibility: hidden;
    background-color: #fff;
    width: 76.5%;
    margin-left: 15px;
    margin-top: -8px;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.25s;
  }

  &:hover .content {
    visibility: ${(props) => (props.disabled ? 'hidden' : 'visible')};
    opacity: 1;
  }

  & .content div {
    padding: 5px;
  }

  & .content div:first-of-type {
    border-radius: 10px 0 0 0;
  }

  & .content div:nth-of-type(3) {
    border-radius: 0 10px 0 0;
  }

  & .content div:nth-of-type(39) {
    border-radius: 0 0 0 10px;
  }

  & .content div:hover {
    background-color: #eee;
  }
`;

export const DatePick = (props) => {
  const [date, setDate] = useState(new Date());

  return (
    <DateWrapper disabled={props.disabled}>
      <Input {...props} />
      <div className="content">
        <div style={{ gridColumn: '1/4' }}>
          <Icon src="arrow-left.svg" />
        </div>
        <div>NOV</div>
        <div style={{ gridColumn: '5/8' }}>
          <Icon src="arrow-right.svg" />
        </div>
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
          <div key={day} style={{ backgroundColor: '#ddd' }}>
            {day}
          </div>
        ))}
        {[...Array(31).keys()].map((num) => (
          <div key={num}>{num + 1}</div>
        ))}
      </div>
    </DateWrapper>
  );
};

const DateIcon = styled(Icon)`
  pointer-events: none;
`;

// export const Date = (props) => {
//   return (
//     <Row>
//       <DateInput {...props} type="date" />
//       <DateIcon src="arrow-down.svg" alt="Arrow-down" />
//     </Row>
//   );
// };

export const Mini = styled.input`
  ${Shared}

  width: 90%;
  margin: 0px;
  padding: 3px;
  background-color: #fff;
  border-bottom: ${(props) =>
    props.disabled ? '2px solid transparent' : '2px solid #ccc'};
  border-radius: 0px;

  &:focus {
    border-bottom: 2px solid #5187ed;
    border-radius: 5px 5px 0px 0px;
  }
`;

export default Input;
