import styled from "styled-components";

const Cell = styled.button`
  width: 100px;
  height: 100px;
  background-color: ${(prop) => (prop.picked ? "#CCDDFF" : ``)};
`;

export default Cell;
