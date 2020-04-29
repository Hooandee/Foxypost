import React from "react";

import { PostType } from "../../../../hooks/Posts/actions";
import { useSpring } from "react-spring";
import { Card } from "./styles";

export const Component = (propsA: PostType) => {
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
        transform: props.xys.interpolate(trans),
        backgroundImage: `url(${propsA.image_url})`,
      }}
    />
  );
};
