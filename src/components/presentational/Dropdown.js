import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import { Row } from './styled/Layout';
import Input, { Shared } from './styled/Input';
import Icon, { StaticIcon } from './styled/Icon';
import { Text } from './styled/Global';
import { FullButton } from './styled/Button';

const StyledTaskSection = styled.div`
  & .content {
    visibility: ${(props) => (props.closed ? 'hidden' : 'visible')};
    max-height: ${(props) => (props.closed ? 0 : '100vh')};
    overflow: ${(props) => (props.closed ? 'hidden' : 'auto')};
    opacity: ${(props) => (props.closed ? 0 : 1)};
    transition: all 0.4s ease-in-out, max-height 0.3s ease-in-out;
  }
`;

export const TaskSection = ({
  title,
  emptyPrompt,
  children,
  actionButton = ''
}) => {
  const defaultClosed = !children.length;
  const [closed, setClosed] = useState(defaultClosed);

  useEffect(() => {
    setClosed(!children.length);
  }, [children.length]);

  const content = children.length ? (
    <>
      {children} {!actionButton.length ? actionButton : ''}
    </>
  ) : (
    <FullButton info>{emptyPrompt}</FullButton>
  );

  return (
    <StyledTaskSection closed={closed}>
      <Row style={{ margin: '0' }}>
        <Text primary style={{ marginRight: 'auto' }}>
          {title}
        </Text>
        <Icon
          src={closed ? 'arrow-down.svg' : 'arrow-up.svg'}
          onClick={() => setClosed(!closed)}
        />
      </Row>
      <div className="content">{content}</div>
    </StyledTaskSection>
  );
};

const DropdownWrapper = styled.div`
  ${Shared}

  width: 90%;
  margin: 5px auto;
  text-align: left;
  padding: 0 8px;

  & .content {
    position: absolute;
    opacity: ${(props) => (!props.myDisabled && !props.closed ? '1' : '0')};
    width: 77%;
    max-height: ${(props) =>
      !props.myDisabled && !props.closed ? '300px' : '0'};
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
    cursor: ${(props) => (props.myDisabled ? 'default' : 'pointer')};
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

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setClosed(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <DropdownWrapper myDisabled={disabled} closed={closed} ref={node}>
      <Row
        onClick={() => {
          if (!disabled) setClosed(!closed);
        }}
        style={{ padding: '8px 0' }}
      >
        {disabled ? (
          <div
            style={{
              padding: '2px 12px',
              borderRadius: '10px',
              backgroundColor: '#f2bd3f'
            }}
          >
            {selected}
          </div>
        ) : (
          <div>{selected}</div>
        )}
        {disabled ? (
          ''
        ) : (
          <StaticIcon src={closed ? 'arrow-down.svg' : 'arrow-up.svg'} />
        )}
      </Row>
      <div className="content">
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

  &:hover {
    cursor: pointer;
  }
`;

const DropdownGrid = css`
  & .content {
    position: absolute;
    visibility: ${(props) =>
      !props.myDisabled && !props.closed ? 'visible' : 'hidden'};
    opacity: ${(props) => (!props.myDisabled && !props.closed ? '1' : '0')};
    display: grid;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
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
    margin-top: 1px;
    margin-left: -53px;
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

// export const TimePicker = (props) => {
//   const maxTime = props.hours ? 23 : 59;
//   const nums = [...Array(maxTime).keys()];

//   return (
//     <Dropdown
//       selected={props.val}
//       onSelect={props.setVal}
//       options={nums}
//       disabled={props.hidden}
//     />
//   );
// };

export const NumpadInput = (props) => {
  /* track which digit numpad is changing */
  const [firstDigit, setFirstDigit] = useState(true);
  const [closed, setClosed] = useState(true);

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setClosed(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const updateNumber = (num) => {
    props.onChange({
      target: { value: firstDigit ? num : props.value * 10 + num }
    });
    setFirstDigit((prev) => !prev);
  };

  return (
    <DropdownNumpadGrid myDisabled={props.disabled} closed={closed} ref={node}>
      <NumberInput {...props} onClick={() => setClosed(!closed)} />
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
  text-align: left;
  width: 50%;

  & .content {
    width: 77%;
    grid-template-columns: repeat(7, auto);
    margin-left: 6px;
    margin-top: -1px;
    text-align: center;
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

const TimeWrapper = styled.div`
  ${Shared}
  width: 40%;
  text-align: left;

  & .content {
    position: absolute;
    opacity: ${(props) => (!props.myDisabled && !props.closed ? '1' : '0')};
    max-height: ${(props) =>
      !props.myDisabled && !props.closed ? '200px' : '0'};
    overflow: auto;
    margin-top: 6px;
    margin-left: -40px;
    background-color: #fff;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
  }

  &:hover {
    cursor: ${(props) => (props.myDisabled ? 'default' : 'pointer')};
  }

  & .content p {
    margin: 0;
    padding: 5px 10px;
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

const DateTimeWrapper = styled.div``;

const NumberScroller = ({ disabled, min, max, selected, onSelect }) => {
  const [closed, setClosed] = useState(true);

  const options = [...Array(max - min + 1).keys()].map((e) => e + min);

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setClosed(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <TimeWrapper myDisabled={disabled} closed={closed} ref={node}>
      <Row
        onClick={() => {
          if (!disabled) setClosed(!closed);
        }}
      >
        {disabled ? (
          <div
            style={{
              padding: '2px 12px',
              borderRadius: '10px',
              backgroundColor: '#f2bd3f'
            }}
          >
            {selected}
          </div>
        ) : (
          <div>{selected}</div>
        )}
      </Row>
      <div className="content">
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
    </TimeWrapper>
  );
};

const DropdownTimeGrid = styled.div`
  ${DropdownGrid}
  width: 40%;
  text-align: left;

  & .content {
    width: 77%;
    margin-left: -42.5%;
    margin-top: -1px;
    grid-template-columns: repeat(3, auto);
  }

  & .content div {
    padding: 0;
    max-height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  & .content div::-webkit-scrollbar {
    width: 0;
    // background: transparent;
  }

  & .content .highlighted {
    background-color: #5187ed;
    color: #fff;
  }

  & .content div:hover {
    cursor: default;
    background-color: #fff;
  }

  & .content p {
    width: 100%;
    padding: 8px 5px;
    margin: 0;
    text-align: center;
  }

  & .content p:hover {
    cursor: pointer;
    color: #000;
    background-color: #e5e5e5;
  }

  & .content div:first-of-type {
    border-radius: 10px 0 0 10px;
  }

  & .content div:last-of-type {
    border-radius: 0 10px 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const TimePicker = ({ disabled, placeholder, value, onChange }) => {
  const [closed, setClosed] = useState(true);
  const [date, setDate] = useState(new Date(value));
  const [inputField, setInputField] = useState(0);
  const [cursorPos, setCursorPos] = useState([0, 0]);

  const node = useRef();
  const hourRef = useRef();
  const minuteRef = useRef();
  const inputRef = useRef();

  const scrollRef = (ref, offset) => {
    const elem = ref.current;
    const parent = elem.parentNode;
    parent.scrollTop = elem.offsetTop - parent.offsetTop - offset;
  };

  useEffect(() => {
    inputRef.current.setSelectionRange(cursorPos[0], cursorPos[1]);
  }, [date]);

  useEffect(() => {
    setDate(new Date(value));
    scrollRef(hourRef, 80);
    scrollRef(minuteRef, 80);

    // hourRef.current.parentNode.scrollTop =
    //   hourRef.current.offsetTop - hourRef.current.parentNode.offsetTop - 100;
    // minuteRef.current.parentNode.scrollTop =
    //   minuteRef.current.offsetTop -
    //   minuteRef.current.parentNode.offsetTop -
    //   100;
  }, [value]);

  const getHours = (dateParam = null) => {
    const hours = dateParam ? dateParam.getHours() : date.getHours();
    if (hours === 0 || hours === 12) {
      return 12;
    }
    return hours > 12 ? hours - 12 : hours;
  };
  const getMinutes = (dateParam = null) =>
    dateParam ? dateParam.getMinutes() : date.getMinutes();
  const getAmpm = (dateParam = null) => {
    const hrs = dateParam ? dateParam.getHours() : date.getHours();
    return hrs >= 12 ? 'PM' : 'AM';
  };

  const formatTime = (date) => {
    let hours = getHours(date);
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes = getMinutes(date);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = getAmpm(date);

    const str = `${hours}:${minutes} ${ampm}`;
    return str;
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setClosed(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <DropdownTimeGrid myDisabled={disabled} closed={closed} ref={node}>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={formatTime(date)}
        onChange={(e) => {
          const k = e.target.value.indexOf(':');
          const l = e.target.value.indexOf(' ');

          let hours = parseInt(e.target.value.substring(0, k));
          let minutes = parseInt(e.target.value.substring(k + 1, l));

          hours = hours < 0 ? 0 : hours > 12 ? 12 : hours;
          minutes = minutes < 0 ? 0 : minutes > 59 ? 59 : minutes;

          const newDate = new Date(date);
          if (getAmpm() == 'AM') {
            newDate.setHours(hours);
          } else {
            newDate.setHours(hours + 12);
          }
          newDate.setMinutes(minutes);

          setDate(newDate);
          onChange({
            target: { value: newDate }
          });
          if (e.target.selectionStart <= 3) {
            if (hours != 1) {
              setCursorPos([3, 5]);
            } else {
              setCursorPos([2, 2]);
            }
          } else {
            if (minutes > 5) {
              setCursorPos([0, 2]);
            } else {
              setCursorPos([5, 5]);
            }
          }
        }}
        disabled={disabled}
        myDisabled={disabled}
        onClick={(e) => {
          if (!disabled) setClosed(false);

          if (e.target.selectionStart < 2) {
            e.target.setSelectionRange(0, 2);
          } else {
            e.target.setSelectionRange(3, 5);
          }
        }}
        no-hover
      />
      <div className="content">
        <div>
          {[...Array(12).keys()].map((e) => (
            <p
              ref={getHours() === e + 1 ? hourRef : null}
              className={getHours() === e + 1 ? 'highlighted' : ''}
              onClick={() => {
                const newDate = new Date(date);
                if (getAmpm() === 'AM') newDate.setHours(e + 1);
                else newDate.setHours(e + 13);
                setDate(newDate);
                onChange({
                  target: { value: newDate }
                });
              }}
            >
              {e + 1 < 10 ? '0' + (e + 1) : e + 1}
            </p>
          ))}
        </div>
        <div>
          {[...Array(59).keys()].map((e) => (
            <p
              ref={getMinutes() === e + 1 ? minuteRef : null}
              className={getMinutes() === e + 1 ? 'highlighted' : ''}
              onClick={() => {
                const newDate = new Date(date);
                newDate.setMinutes(e + 1);
                setDate(newDate);
                onChange({
                  target: { value: newDate }
                });
              }}
            >
              {e + 1 < 10 ? '0' + (e + 1) : e + 1}
            </p>
          ))}
        </div>
        <div>
          {['AM', 'PM'].map((e) => (
            <p
              className={getAmpm() === e ? 'highlighted' : ''}
              onClick={() => {
                const newDate = new Date(date);
                const hours = newDate.getHours();
                if (e === 'PM' && hours < 12) newDate.setHours(hours + 12);
                else if (e === 'AM' && hours >= 12)
                  newDate.setHours(hours - 12);
                setDate(newDate);
                onChange({
                  target: { value: newDate }
                });
              }}
            >
              {e}
            </p>
          ))}
        </div>
      </div>
    </DropdownTimeGrid>
  );
};

export const DateTimePicker = ({ disabled, placeholder, value, onChange }) => {
  const [date, setDate] = useState(new Date(value));
  const [time, setTime] = useState(new Date(value));

  const handleChange = (date, time) => {
    setDate(date);
    setTime(time);
    const newDate = new Date(date);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());

    onChange({
      target: { value: newDate }
    });
  };

  return (
    <DateTimeWrapper>
      <Row spaceEvenly style={{ width: '100%', marginLeft: '-8px' }}>
        <DatePicker
          disabled={disabled}
          placeholder={placeholder}
          value={date.toDateString()}
          onChange={(e) => {
            // setDate(e.target.value);
            handleChange(e.target.value, time);
          }}
        />
        <TimePicker
          disabled={disabled}
          placeholder="Time"
          value={time}
          onChange={(e) => {
            // setTime(e.target.value);
            handleChange(date, e.target.value);
          }}
        />
      </Row>
    </DateTimeWrapper>
  );
};

export const DatePicker = (props) => {
  const [closed, setClosed] = useState(true);
  const [date, setDate] = useState(new Date(props.value));
  const [viewDate, setViewDate] = useState({
    month: date.getMonth(),
    year: date.getFullYear()
  });

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setClosed(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
    return date.toDateString();
  };

  return (
    <DropdownDateGrid myDisabled={props.disabled} closed={closed} ref={node}>
      <Input
        {...props}
        myDisabled={props.disabled}
        onClick={(e) => {
          e.target.blur();
          if (!props.disabled) setClosed(!closed);
        }}
        no-hover
      />
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
            style={{ backgroundColor: '#ddd', fontSize: '13px' }}
            className="no-hover"
          >
            {day}
          </div>
        ))}
        {[...Array(offset).keys()].map((num) => (
          <div key={num} className="no-highlight" />
        ))}
        {[...Array(months[viewDate.month].days).keys()].map((num) => (
          <div
            key={num}
            className={checkClasses(num + 1)}
            onClick={() => {
              const newDateStr = generateDateString(num + 1);
              const newDate = new Date(newDateStr);
              props.onChange({
                target: { value: newDate }
              });
              setDate(newDate);
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
