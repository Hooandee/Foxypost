import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
  z-index: 100;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.35);
`;

export const Content = styled.article`
  height: 80%;
  width: 80%;
  background: white;
  position: relative;
  box-shadow: 0px 5px 10px #00000017;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
`;

export const Spikes = styled.section`
  position: relative;
  background: #fff;

  &:before {
    content: "";
    position: absolute;
    right: 0;
    left: -0%;
    top: -30px;
    z-index: 10;
    display: block;
    height: 30px;
    background-size: 30px 100%;
    background-image: linear-gradient(135deg, #fff 25%, transparent 25%),
      linear-gradient(225deg, #fff 25%, transparent 25%);
    background-position: 0 0;
    transform: rotate(180deg);
  }
`;

export const SpikesInversed = styled.section`
  position: relative;
  background: #fff;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    left: -0%;
    z-index: 10;
    display: block;
    height: 30px;
    background-size: 30px 100%;
    background-image: linear-gradient(135deg, #fff 25%, transparent 25%),
      linear-gradient(225deg, #fff 25%, transparent 25%);
    background-position: 0 0;
  }
`;

export const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  background-color: transparent;
  background-image: url(https://img.icons8.com/ios/30/000000/delete-sign.png);
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  background-color: transparent;
  background-image: url(https://img.icons8.com/wired/30/000000/delete-forever.png);
  position: absolute;
  right: 70px;
  top: 10px;
`;

export const Title = styled.h1`
  font-size: 5em;
  color: white;
  text-shadow: 5px 7px 15px #00000038;
`;

export const Paragraph = styled.em`
  font-size: 2em;
  padding: 2em;
`;

export const Header = styled.section`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MapContainer = styled.section`
  width: 100%;
  height: 400px;
`;
