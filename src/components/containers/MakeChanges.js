import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import Task from '../presentational/Task';
import { Text } from '../presentational/styled/Global';
import { FullButton } from '../presentational/styled/Button';
import { Row } from '../presentational/styled/Layout';
import { DateTimePicker } from '../presentational/Dropdown';
import TaskService from '../../services/TaskService';

const ChangeList = (props) => {
  const [changing, setChanging] = useState([]);
  const [selected, setSelected] = useState([]);

  const initDate = new Date();
  initDate.setTime(initDate.getTime() + 60 * 60 * 1000);
  initDate.setMinutes(0);
  const [schedulingStart, setSchedulingStart] = useState(initDate);

  const history = useHistory();

  useEffect(() => {
    // console.log(props.match, props.location);
    const tempChanging = [];
    const ids = props.match.params.ids.split(',');
    ids.forEach((id) => {
      TaskService.getTask(id, (task) => {
        console.log('got', task);
        tempChanging.push(task);
        if (tempChanging.length === ids.length) {
          setChanging(tempChanging);
          setSelected(tempChanging.map((t) => t.id));
        }
      });
    });
  }, []);

  const deleteTask = (id) => {};

  const selectTask = (id) => {
    const thisSelected = selected;
    const thisSetSelected = setSelected;
    if (thisSelected.indexOf(id) === -1) {
      thisSetSelected(thisSelected.concat([id]));
    } else {
      thisSetSelected(thisSelected.filter((num) => num !== id));
    }
  };

  return (
    <div>
      <Text primary style={{ textAlign: 'left' }}>
        Update tasks or deselect tasks you do not want scheduled at this time:
      </Text>
      {changing.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleSelect={selectTask}
          selected={selected.indexOf(task.id) !== -1}
        />
      ))}
      <Row>
        <p>When do you want to start scheduling?</p>
      </Row>
      <DateTimePicker
        value={schedulingStart}
        onChange={(e) => setSchedulingStart(e.target.value)}
      />
      <Row>
        <FullButton
          onClick={() => {
            history.push('/tasklist');
          }}
        >
          Cancel Scheduling
        </FullButton>
        <FullButton
          disabled={!selected.length}
          onClick={() => {
            let selectedstr = selected.join(',');
            history.push(
              `/scheduling/${selectedstr}?start=${schedulingStart.toISOString()}`
            );
          }}
        >
          Schedule{' '}
          {selected.length === changing.length
            ? 'All'
            : selected.length
            ? selected.length
            : 'No'}{' '}
          {selected.length > 1 || selected.length === changing.length
            ? 'Tasks'
            : 'Task'}
        </FullButton>
      </Row>
    </div>
  );
};

export default withRouter(ChangeList);
