import { useRouteError } from "react-router-dom";
import styled from "styled-components";

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  console.error(error);

  const Container = styled.div`
    height: 100%;
    width: 100%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* gap: 10px; */
  `;

  const Code = styled.h1`
    font-size: 55px;
  `;

  const ErrorMessage = styled.p`
    font-size: 33px;
    margin-bottom: 20px;
  `;

  const Info = styled.p`
    font-size: 24px;
    color: #848484;
  `;

  return (
    <Container id="error-page">
      <Code> 404 </Code>
      <ErrorMessage> {error.statusText || error.message} </ErrorMessage>
      <Info> Sorry, an unexpected error has occurred </Info>
    </Container>
  );
}
