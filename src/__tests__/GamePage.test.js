import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Server } from "socket.io";
import { createServer } from "http";
import { Client } from "socket.io/dist/client";
import GamePage from "../components/Pages/GamePage";
import store from "../store";

describe("GamePage", () => {
  let io, serverSocket, clientSocket;

  // beforeAll((done) => {
  //   const httpServer = createServer();
  //   io = new Server(httpServer);
  //   httpServer.listen(() => {
  //     const port = httpServer.address().port;
  //     clientSocket = new Client(`http://localhost:5000`);
  //     io.on("connection", (socket) => {
  //       serverSocket = socket;
  //     });
  //     clientSocket.on("connect", done);
  //   });
  // });

  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>
    );
  });

  it("should return a message on error", () => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>
    );
    // Socket.emit;
  });
});
