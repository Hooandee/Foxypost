import React from "react";
import { useSpring } from "react-spring";

import { Card, EditButton, Title, Overlay } from "./styles";

import { POST_PAGE_OBJECT } from "./index.test.page";

type Props = {
  imageUrl: string;
  id: number;
  onEditClickHandler: () => void;
  title: string;
};

export const Component = ({
  id,
  imageUrl,
  onEditClickHandler,
  title,
}: Props) => {

  // Calculations for perspective wrapping:
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

  const onInnerEditClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onEditClickHandler();
  };

  return (
    <Card
      data-testid={POST_PAGE_OBJECT.card(id)}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      onMouseDown={() => set({ xys: [0, 0, 0.95] })}
      style={{
        transform: props.xys.to(trans),
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <EditButton
        data-testid={POST_PAGE_OBJECT.editButton(id)}
        onClick={onInnerEditClickHandler}
      />
      <Overlay>
        <Title>{title}</Title>
      </Overlay>
    </Card>
  );
};
