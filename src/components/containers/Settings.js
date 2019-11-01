import React from 'react';
import styled from 'styled-components';

import Input from '../presentational/styled/Input';

const Wrapper = styled.div`
  text-align: left;
  width: 80%;
  margin: auto;
`;

const Settings = () => {
  return (
    <Wrapper>
      <h3>PANEL FOR SETTINGS</h3>
      <h1>This is Arun's react test</h1>
      <Input placeholder="Profile" />
      <Input placeholder="Dark Mode" />
      <Input placeholder="Achievement" />
      <Input placeholder="About" />
      <Input placeholder="Log Out" />
    </Wrapper>
  );
};

export default Settings;
