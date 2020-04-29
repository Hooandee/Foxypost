import React, { useContext, useEffect, useState } from "react";

import GoogleMapReact from "google-map-react";

import {
  Container,
  Content,
  CloseButton,
  DeleteButton,
  Header,
  MapContainer,
  Paragraph,
  Spikes,
  SpikesInversed,
  Title,
} from "./styles";

import { Component as AlertWarning } from "./components/Alert";

import usePostsInfoApi from "../../../../hooks/Posts";
import { MainContext } from "../../../../hooks/index.reducer";

type Props = {
  id: number;
  handleClickOutside: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Component = ({ id, handleClickOutside }: Props) => {
  const { state } = useContext(MainContext);
  const [, getPostDetails] = usePostsInfoApi();
  const [alertIsShown, showAlert] = useState(false);

  useEffect(() => {
    getPostDetails(id);
  }, [id, getPostDetails]);

  console.log(state?.posts?.postDetails);
  return (
    <Container>
      <Content>
        {alertIsShown && (
          <AlertWarning
            handleCancelClick={() => showAlert(false)}
            handleDeleteClick={handleClickOutside}
          />
        )}
        <DeleteButton onClick={() => showAlert(true)} />
        <CloseButton onClick={handleClickOutside} />
        <div>
          <Header
            style={{
              backgroundImage: `url(${state?.posts?.postDetails?.image_url})`,
            }}
          >
            <Title>{state?.posts?.postDetails?.title}</Title>
          </Header>
          <Spikes />
        </div>

        <Paragraph>{state?.posts?.postDetails?.content}</Paragraph>

        <div>
          <SpikesInversed />
          <MapContainer>
            <GoogleMapReact
              defaultCenter={{
                lat: +state?.posts?.postDetails?.lat,
                lng: +state?.posts?.postDetails?.long,
              }}
              defaultZoom={10}
            />
          </MapContainer>
        </div>
      </Content>
    </Container>
  );
};
