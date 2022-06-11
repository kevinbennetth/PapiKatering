import { createContext, useReducer, useState } from "react";

const APIContext = createContext({
  API_URL: "",
});

const CartContext = createContext({ cart: {}, onUpdateCart: () => {} });

const UserContext = createContext({
  customerID: "",
  merchantID: "",
  onUserLogin: () => {},
});

const cartReducer = (state, data) => {
  return { ...state, ...data };
};

const PacketContext = createContext({
  packetid: "",
  onSelectPacket: () => {},
});

export const ContextProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, {
    packetid: "",
    merchantid: "",
    customerid: "",
    orderdaycount: "",
    orderquantity: "",
  });

  const [user, setUser] = useState({ customerID: "", merchantID: "" });
  const [selectPacket, setSelectPacket] = useState("");

  const updateCartHandler = (value) => {
    dispatchCart(value);
  };

  const selectPacketHandler = (value) => {
    setSelectPacket(value);
  };

  const setLoggedUserHandler = (customerID, merchantID) => {
    setUser({ customerID, merchantID });
  };

  return (
    <APIContext.Provider value={{ API_URL: "http://localhost:8080/" }}>
      <CartContext.Provider value={{ cart, onUpdateCart: updateCartHandler }}>
        <UserContext.Provider
          value={{
            customerID: user.customerID,
            merchantID: user.merchantID,
            onUserLogin: setLoggedUserHandler,
          }}
        >
          <PacketContext.Provider
            value={{
              packetid: selectPacket,
              onSelectPacket: selectPacketHandler,
            }}
          >
            {props.children}
          </PacketContext.Provider>
        </UserContext.Provider>
      </CartContext.Provider>
    </APIContext.Provider>
  );
};

export { APIContext, CartContext, UserContext, PacketContext };
