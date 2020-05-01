import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

import { LoadingContainer } from "../../../../components/LoadingContainer";
import { Component as AlertWarning } from "./components/Alert";
import usePostsInfoApi from "../../../../hooks/Posts";
import { MainContext } from "../../../../hooks/index.reducer";

import {
  Container,
  Content,
  CloseButton,
  DeleteButton,
  Header,
  LastModification,
  MapContainer,
  Paragraph,
  Spikes,
  SpikesInversed,
  Title,
} from "./styles";

type Props = {
  id: number;
  handleClickOutside: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Component = ({ id, handleClickOutside }: Props) => {
  const [alertIsShown, showAlert] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { state } = useContext(MainContext);
  const { getPostDetails, deletePost } = usePostsInfoApi();

  useEffect(() => {
    getPostDetails(id).then(() => setIsLoadingData(false));
  }, [id, getPostDetails]);

  const {
    content,
    image_url,
    lat,
    long,
    title,
    updated_at,
  } = state?.posts?.postDetails;

  return (
    <Container>
      <Content>
        {alertIsShown && (
          <AlertWarning
            handleCancelClick={() => showAlert(false)}
            handleDeleteClick={() =>
              deletePost(id).then(() => handleClickOutside())
            }
          />
        )}
        {isLoadingData && <LoadingContainer />}
        <DeleteButton onClick={() => showAlert(true)} />
        <CloseButton onClick={handleClickOutside} />
        <div>
          <Header
            style={{
              backgroundImage: `url(${image_url})`,
            }}
          >
            <Title>{title}</Title>
          </Header>
          <Spikes />
        </div>
        <LastModification>
          <em>Last Update: </em>
          <time dateTime="DD-MM-YYYY">
            {format(new Date(updated_at || "2020"), "dd/MM/yyyy")}
          </time>
        </LastModification>
        <Paragraph>{content}</Paragraph>

        <div>
          <SpikesInversed />
          <MapContainer>
            {!isLoadingData && (
              <GoogleMapReact
                center={{
                  lat: +lat,
                  lng: +long,
                }}
                defaultZoom={10}
              />
            )}
          </MapContainer>
        </div>
      </Content>
    </Container>
  );
};
