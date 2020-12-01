import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Toast, Graphic } from "../components";

const SOCKET = "ws://localhost:3001";

const GraphicTemperature = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  let lastElement = data.length - 1;

  useEffect(() => {
    const socket = new WebSocket(SOCKET);

    socket.onmessage = ({ data = "" }) => {
      try {
        const newDate = JSON.parse(data);
        if (newDate.temperature >= 100) return false;

        setData((arr) => [
          ...arr,
          {
            ...newDate,
            y: newDate.temperature,
            x: newDate.timestamp,
          },
        ]);
      } catch (e) {
        return false;
      }
    };

    socket.onopen = function (event) {
      setMessage("WSS is opened");
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        setMessage("WSS was closed clean");
      } else {
        setMessage("Lost connection");
      }
      setMessage("Code: " + event.code + " reason: " + event.reason);
    };

    socket.onerror = function (error) {
      console.log("Error: " + error.message);
    };
  }, []);

  return (
    <GraphicContainer>
      <InfoBlockContainer>
        <InfoBlock>
          <strong> ID: {data[lastElement - 1]?.id} </strong> <br />
          Temp: {data[lastElement - 1]?.temperature} C
        </InfoBlock>

        <InfoBlock>
          <strong> ID: {data[lastElement]?.id} </strong> <br />
          Temp: {data[lastElement]?.temperature} C
        </InfoBlock>
      </InfoBlockContainer>

      <Graphic dataPoints={data} />

      {message && <Toast>{message}</Toast>}
    </GraphicContainer>
  );
};

const GraphicContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 4vh auto;
  padding: 1px;
`;

const InfoBlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
`;

const InfoBlock = styled.div`
  width: 300px;
  height: 60px;
  padding: 30px 10px;
  box-sizing: content-box;
  border: 1px solid lightskyblue;
  border-radius: 15px;
  font-size: 1.6rem;

  strong {
    margin-bottom: 20px;
    font-size: 2rem;
  }
`;

GraphicTemperature.uiName = "GraphicTemperature";
GraphicTemperature.displayName = "GraphicTemperature";

export default GraphicTemperature;
