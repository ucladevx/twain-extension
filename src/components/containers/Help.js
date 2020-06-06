import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FullButton } from '../presentational/styled/Button';

const Nav = styled.nav`
  background-image: url('navbar.png');
  background-repeat: no-repeat;

  height: 67px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin: -10px -8px 12px -8px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
`;
const Header = styled.p`
  display: flex;
  justify-content: flex-start;
  margin-left: 0px;
  margin-bottom: 5px;
  font-size: 16px;
`;
const HelpHeader = styled.p`
  font-size: 18px;
  color: #fff;
  margin-left: 5%;
  justify-content: flex-start;
  margin-right: auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  font-size: 14px;
  font: 'Roboto';
  color: #6b6b6b;
`;

const FeedbackButton = styled(FullButton)`
  &:hover {
    cursor: pointer;
  }
`;

const Help = () => {
  const url = 'https://docs.google.com/forms/d/e/1FAIpQLSfUxbL9QPukU8KK-H5RKyU4X3INSJXfsAnZAnjV3k0_qUyL6Q/viewform';
  return (
    <div>
      <Nav>
        <StyledLink to="/tasklist">
          <img
            style={{ width: '20px', padding: '2px' }}
            src="white-arrow-left.svg"
            alt="arrow-left"
          />
        </StyledLink>
        <HelpHeader>Help</HelpHeader>
      </Nav>
      <Header>How to use Twain</Header>
      <FullButton info>
        <StyledLink to="/walkthrough">Twain Walkthrough</StyledLink>
      </FullButton>
      <Header>Report an issue</Header>
      <FeedbackButton
        info
        onClick={() => {
          window.open(url, '_blank');
        }}
      >
        Send Feedback
      </FeedbackButton>
    </div>
  );
};

export default Help;
