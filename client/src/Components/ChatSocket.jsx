import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function ChatSocket() {

  const socket = io.connect('http://localhost:3000');

  return (
    <>
    </>
  );
}

export default ChatSocket;
