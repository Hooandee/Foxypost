import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const Grid = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;

export const PostWrapper = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const AddPost = styled.button`
  width: 100px;
  min-height: 40px;
  align-self: flex-end;
  margin: 20px 30px;
  font-size: 1em;
  font-weight: bold;
  color: #00272b;
  background: linear-gradient(90deg, #4cb8c4, #3cd3ad);
  border-radius: 10px;
  border: 0;
  box-shadow: -1px 6px 10px #00272b36;
  transition: 0.3s ease-in-out all;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1);
  }
`;
