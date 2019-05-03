import styled from 'styled-components';
import PropTypes from 'prop-types';

const ColumnContainer = styled.div`
  display: flex 
  flex-direction: column;
  align-items: ${props => props.ai || 'center'};
  justify-content: ${props => props.jc || 'center'};
`;

const RowContainer = styled.div`
  display: flex 
  flex-direction: row;
  flex-wrap: ${props => props.fw || 'wrap'};
  align-items: ${props => props.ai || 'center'};
  justify-content: ${props => props.jc || 'center'};
`;

export { ColumnContainer, RowContainer };