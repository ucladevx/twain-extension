import React from 'react';
import styled from 'styled-components';

import Input from './Input';

const Card = styled.div`
  width: 80%;
  text-align: left;
  background-color: #eee;
  border: 2px solid #ddd;
  border-radius: 5px;
  padding: 8px;
  margin: 10px auto;

  &:hover {
    background-color: #ddd;
  }
`;

const Task = () => {
  return (
    <Card>
      <h3>Title.</h3>
      <p>Empty.</p>
    </Card>
  );
};

export const NewTask = () => {
  return (
    <Card>
      <h3>
        <Input placeholder="Title" />
      </h3>
      <p>
        <Input placeholder="Details" />
      </p>
    </Card>
  );
};

export default Task;
