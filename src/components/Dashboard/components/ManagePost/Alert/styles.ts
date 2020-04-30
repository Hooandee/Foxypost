import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.85);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 2em;
  color: white;
  text-shadow: -1px 6px 10px #191919;
`;

export const CancelButton = styled.button`
  width: 200px;
  height: 60px;
  background: linear-gradient(90deg, #ece9e6, #ffffff);
  border-radius: 10px;
  border: 0;
  margin: 0px 10px;
  font-size: 1.5em;
  font-weight: bold;
  box-shadow: -1px 6px 10px #191919;
  transition: 0.3s ease-in-out all;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

export const DeleteButton = styled.button`
  width: 200px;
  height: 60px;
  background: linear-gradient(90deg, #e53935, #e35d5b);
  border-radius: 10px;
  border: 0;
  margin: 0px 10px;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  box-shadow: -1px 6px 10px #2b0100;
  transition: 0.3s ease-in-out all;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1);
  }
`;
