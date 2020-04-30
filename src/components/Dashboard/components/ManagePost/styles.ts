import styled, { keyframes } from "styled-components";

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
  width: 50%;
  background: white;
  position: relative;
  box-shadow: 0px 5px 10px #00000017;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  background: linear-gradient(349deg, #e9f5f4, #ffffff);
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

export const SaveButton = styled.button`
  width: 200px;
  height: 50px;
  background: linear-gradient(90deg, #11998e, #38ef7d);
  border-radius: 10px;
  border: 0;
  margin: 0px 10px;
  font-size: 1.5em;
  font-weight: bold;
  color: #00272b;
  box-shadow: -1px 6px 10px #3cd3ad;
  transition: 0.3s ease-in-out all;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }

  &:disabled {
    cursor: disabled;
    cursor: not-allowed;
    filter: grayscale(1);
    transform: scale(1);
  }
`;

export const CancelButtonSmall = styled.button`
  width: 200px;
  height: 50px;
  background: linear-gradient(90deg, #cccccc, #eaeaea);
  color: #4e595a;
  border-radius: 10px;
  border: 0;
  margin: 0px 10px;
  font-size: 1.5em;
  font-weight: bold;
  box-shadow: -1px 6px 10px #c1c1c1;
  transition: 0.3s ease-in-out all;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

export const Title = styled.h1`
  color: #00272b;
  font-size: 2em;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 30px;

  label {
    font-weight: bold;
    font-size: 1.5em;
    color: #00272b;
    margin-bottom: 5px;
  }

  input, textarea {
    border-radius: 10px;
    height: 40px;
    width: 100%;
    border: solid 1px #49bfb6;
    margin-bottom: 15px;
    transition: .2s all ease-in-out;

    &:focus {
      box-shadow: 0px 0px 0 3px #11998e;
      outline:0;
      }
    }

  }
`;

export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 0;
`;

export const FieldsetVertical = styled.div`
  display: flex;
  flex-direction: row;
  border: 0;
  justify-content: space-around;

  div {
    width: 45%;

    input {
      margin-top: 5px;
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 30px;
`;

export const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.75);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Pulse = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

export const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: ${Pulse} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }

  }
`;
