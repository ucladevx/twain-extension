import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { Row } from './styled/Layout';
import Input, { Shared } from './styled/Input';
import { StaticIcon } from './styled/Icon';

const DropdownWrapper = styled.div`
  ${Shared}

  width: 90%;
  margin: 5px auto;
  text-align: left;

  & .content {
    position: absolute;
    opacity: ${(props) => (!props.disabled && !props.closed ? '1' : '0')};
    width: 77%;
    max-height: ${(props) =>
      !props.disabled && !props.closed ? '300px' : '0'};
    overflow: auto;
    margin-top: 6px;
    margin-left: -8px;
    background-color: #fff;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
  }

  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
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
    background-color: #e5e5e5;
  }
`;

const Dropdown = ({ selected, onSelect, options, disabled }) => {
  /* parent element controls disabled property,
     selecting an option changes the closed property */
  const [closed, setClosed] = useState(true);

  return (
    <DropdownWrapper
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
          <StaticIcon src={closed ? 'arrow-down.svg' : 'arrow-up.svg'} />
        )}
      </Row>
      <div className="content">
        <p style={{ textAlign: 'center' }}>
          <StaticIcon src={'add.svg'} /> Add Category
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
    </DropdownWrapper>
  );
};

const NumberInput = styled.input`
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

const DropdownGrid = css`
  & .content {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    display: grid;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
  }

  &:hover .content {
    visibility: ${(props) =>
      !props.disabled && !props.closed ? 'visible' : 'hidden'};
    opacity: 1;
  }

  & .content div {
    padding: 5px;
  }

  & .content div:hover {
    cursor: pointer;
    color: #000;
    background-color: #e5e5e5;
  }
`;

const DropdownNumpadGrid = styled.div`
  ${DropdownGrid}

  & .content {
    grid-template-columns: 50px 50px 50px;
    margin-top: -3px;
    margin-left: -50px;
  }

  /* round corners */

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
`;

export const NumpadInput = (props) => {
  /* track which digit numpad is changing */
  const [firstDigit, setFirstDigit] = useState(true);
  const [closed, setClosed] = useState(true);

  const updateNumber = (num) => {
    props.onChange({
      target: { value: firstDigit ? num : props.value * 10 + num }
    });
    setFirstDigit((prev) => !prev);
  };

  return (
    <DropdownNumpadGrid
      disabled={props.disabled}
      closed={closed}
      onMouseOver={() => setClosed(false)}
      onMouseLeave={() => setClosed(true)}
    >
      <NumberInput {...props} />
      <div className="content">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} onClick={() => updateNumber(num)}>
            {num}
          </div>
        ))}
        <div
          onClick={() => {
            setFirstDigit(true);
            updateNumber(0);
            setFirstDigit(true);
          }}
        >
          <StaticIcon src="close.svg" />
        </div>
        <div onClick={() => updateNumber(0)}>0</div>
        <div onClick={() => setClosed(true)}>
          <StaticIcon src="check.svg" />
        </div>
      </div>
    </DropdownNumpadGrid>
  );
};

const DropdownDateGrid = styled.div`
  ${DropdownGrid}

  & .content {
    width: 76.5%;
    grid-template-columns: repeat(7, auto);
    margin-left: 15px;
    margin-top: -8px;
  }

  & .content .highlight {
    background-color: #5187ed;
    color: #fff;
  }

  & .content .no-highlight:hover {
    background-color: #fff;
  }

  & .content .no-hover:hover {
    cursor: default;
  }

  /* round corners */

  & .content div:first-of-type {
    border-radius: 10px 0 0 0;
  }

  & .content div:nth-of-type(3) {
    border-radius: 0 10px 0 0;
  }

  & .content .round-left {
    border-radius: 0 0 0 10px;
  }

  & .content .round-right {
    border-radius: 0 0 10px 0;
  }
`;

const months = [
  { name: 'JAN', days: 31 },
  { name: 'FEB', days: 28 },
  { name: 'MAR', days: 31 },
  { name: 'APR', days: 30 },
  { name: 'MAY', days: 31 },
  { name: 'JUN', days: 30 },
  { name: 'JUL', days: 31 },
  { name: 'AUG', days: 31 },
  { name: 'SEP', days: 30 },
  { name: 'OCT', days: 31 },
  { name: 'NOV', days: 30 },
  { name: 'DEC', days: 31 }
];

export const DatePicker = (props) => {
  const [closed, setClosed] = useState(true);
  const [date, setDate] = useState(new Date(props.value));
  const [viewDate, setViewDate] = useState({
    month: date.getMonth(),
    year: date.getFullYear()
  });

  /* find weekdays offset from Sunday before first of month */
  const getOffset = (month, year) => {
    const date = new Date();
    date.setMonth(month);
    date.setFullYear(year);
    date.setDate(1);
    return date.getDay();
  };

  const [offset, setOffset] = useState(
    getOffset(viewDate.month, viewDate.year)
  );

  const updateDate = (month, year) => {
    setViewDate({ month, year });
    setOffset(getOffset(month, year));
  };

  /* check if scheduled day */
  const checkDay = (day) => {
    return (
      day === date.getDate() &&
      viewDate.month === date.getMonth() &&
      viewDate.year === date.getFullYear()
    );
  };

  /* highlight and round the border for certain days */
  const checkClasses = (day) => {
    let hl = '',
      rnd = '';
    if (checkDay(day)) {
      hl = 'highlight';
    }
    if (day + offset === 29) {
      rnd = 'round-left';
    } else if (day + offset === 35) {
      rnd = 'round-right';
    }
    return `${hl} ${rnd}`;
  };

  const generateDateString = (day) => {
    const date = new Date();
    date.setMonth(viewDate.month);
    date.setFullYear(viewDate.year);
    date.setDate(day);
    // return `${'November'} ${date.getDate()}, ${date.getFullYear()}`;
    return date.toDateString();
  };

  return (
    <DropdownDateGrid
      disabled={props.disabled}
      closed={closed}
      onMouseOver={() => setClosed(false)}
      onMouseLeave={() => setClosed(true)}
    >
      <Input {...props} />
      <div className="content">
        <div
          style={{ gridColumn: '1/3' }}
          onClick={() => {
            if (viewDate.month === 0) {
              updateDate(11, viewDate.year - 1);
            } else {
              updateDate(viewDate.month - 1, viewDate.year);
            }
          }}
        >
          <StaticIcon src="arrow-left.svg" />
        </div>
        <div
          style={{ gridColumn: '3/6' }}
          onClick={() => updateDate(date.getMonth(), date.getFullYear())}
        >
          {months[viewDate.month].name} {viewDate.year}
        </div>
        <div
          style={{ gridColumn: '6/8' }}
          onClick={() => {
            if (viewDate.month === 11) {
              updateDate(0, viewDate.year + 1);
            } else {
              updateDate(viewDate.month + 1, viewDate.year);
            }
          }}
        >
          <StaticIcon src="arrow-right.svg" />
        </div>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
          <div
            key={day}
            style={{ backgroundColor: '#ddd' }}
            className="no-hover"
          >
            {day}
          </div>
        ))}
        {[...Array(offset).keys()].map((num) => (
          <div key={num} className="no-highlight"></div>
        ))}
        {[...Array(months[viewDate.month].days).keys()].map((num) => (
          <div
            key={num}
            className={checkClasses(num + 1)}
            onClick={() => {
              const newDate = generateDateString(num + 1);
              props.onChange({
                target: { value: newDate }
              });
              setDate(new Date(newDate));
              setClosed(true);
            }}
          >
            {num + 1}
          </div>
        ))}
      </div>
    </DropdownDateGrid>
  );
};

export default Dropdown;