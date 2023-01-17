import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import generateId from "../ClientFunctions/generateId";

// create socket context
const SocketContext = React.createContext();

// export socket context, this will be imported into children components of provider
// that use the socket
export function useSocket() {
  return useContext(SocketContext);
}

// socket provider will wrap other components in App
export function SocketProvider({ userId, setUserId, gameId, children }) {
  const [socket, setSocket] = useState();

  function getUserId() {
    if (userId !== null) {
      // if User already has id in local storage, return that
      return userId;
    } else {
      // if User doesn't already have id, generate a new one
      // and return it
      const newUserId = generateId();
      setUserId(newUserId);
      return newUserId;
    }
  }

  // create new socket on initial render, and if the user's id ever changes
  // this is put into a useEffect to avoid reconnecting every re-render
  useEffect(() => {
    const idForNewSocket = getUserId();
    // create new socket with the address of the origin url(eg localhost:5000 or 10.168.2.34.34:3000)
    const newSocket = io(window.location.origin, {
      query: { userId: idForNewSocket },
    });

    // store new socket to local state
    setSocket(newSocket);

    // clean up function in return will close socket connection when
    // user navigates away from page
    return () => {
      newSocket.close();
    };
  }, [userId]);

  // create socket provider, pass it the socket now stored in state.
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
