import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

export const CardContainer = styled.div`
  overflow: hidden;
  color: black;
  max-height: 100%;
  height: 350px;
  width: 250px;
  border: 1px solid black;
  border-radius: 3px;
`;

export const Card = styled.div`
  overflow: hidden;
  padding: 6px 8px 2px px;
  border: 1px solid black;
`;

export const CardHeader = styled.div`
  background-color: green;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
`;
