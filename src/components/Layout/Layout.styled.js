import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #1976d2;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
`;
