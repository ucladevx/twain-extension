import React from 'react';
import styled from 'styled-components';

import Input from '../Input';

const Wrapper = styled.div`
  text-align: left;
  width: 80%;
  margin: auto;
`;

const Settings = () => {
  return (
    <Wrapper>
      <h3>PANEL</h3>
      <Input placeholder="Setting" />
      <Input placeholder="Setting" />
      <Input placeholder="Setting" />
      <Input placeholder="Setting" />
      <Input placeholder="Setting" />
    </Wrapper>
  );
};

export default Settings;
