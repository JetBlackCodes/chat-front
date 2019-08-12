import io from "socket.io-client";
export const socket = io.connect("http://localhost:4000");

export const DEFAULT_MESSAGE = [
  {
    login: "Добро пожаловать в чат!",
    message: "Здесь пока нет сообщений"
  }
];
