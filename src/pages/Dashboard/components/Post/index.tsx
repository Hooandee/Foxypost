import React from "react";
import { useSpring } from "react-spring";

import { Card, EditButton, Title, Overlay } from "./styles";

type Props = {
  imageUrl: string;
  title: string;
  onEditClickHandler: () => void;
};

export const Component = ({ imageUrl, onEditClickHandler, title }: Props) => {
  const calc = (x: number, y: number) => [
    -(y - 10) / 100,
    (x - 10) / 100,
    1.01,
  ];
  const trans = (x: number, y: number, s: number) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <Card
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      onMouseDown={() => set({ xys: [0, 0, 0.95] })}
      style={{
        transform: props.xys.to(trans),
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <EditButton
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onEditClickHandler();
        }}
      />
      <Overlay>
        <Title>{title}</Title>
      </Overlay>
    </Card>
  );
};
