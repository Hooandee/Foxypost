import styled from "styled-components";
import { animated } from "react-spring";

export const Container = styled.div`
  height: 50ch;
  width: 50ch;
`;

export const Card = styled(animated.div)`
  width: 45ch;
  height: 45ch;
  background: grey;
  border-radius: 5px;
  background-size: cover;
  background-position: center center;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  will-change: transform;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const EditButton = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  background-color: transparent;
  background-image: url(https://img.icons8.com/windows/30/000000/pencil.png);
  position: absolute;
  left: 10px;
  top: 10px;
  transition: 0.1s all ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 30px 100px -10px rgba(255, 255, 255, 0.4);
  }
`;

export const Title = styled.h1`
  font-size: 3em;
  text-overflow: ellipsis;
  color: white;
  text-shadow: -2px 4px 8px #000000ad;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Overlay = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
  border-radius: 5px;
  background: radial-gradient(#0000006b, transparent);
  display: flex;
  justify-content: center;
  align-items: center;
`;
