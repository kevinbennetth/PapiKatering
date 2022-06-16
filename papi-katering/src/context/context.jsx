import { createContext, useReducer, useState } from "react";

const APIContext = createContext({
  API_URL: "",
});

const CartContext = createContext({ cart: {}, onUpdateCart: () => {} });

const UserContext = createContext({
  customerID: "",
  customerName: "",
  customerImage: "",
  merchantID: "",
  onUserLogin: () => {},
  onUserUpdate: () => {},
  onMerchantCreate: () => {},
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

  const [user, setUser] = useState({
    customerID: "",
    customerName: "",
    customerImage: "",
    merchantID: "",
  });
  const [selectPacket, setSelectPacket] = useState("");

  const updateCartHandler = (value) => {
    dispatchCart(value);
  };

  const selectPacketHandler = (value) => {
    setSelectPacket(value);
  };

  const setLoggedUserHandler = (
    customerID,
    customerName,
    customerImage,
    merchantID
  ) => {
    setUser(() => {
      return { customerID, customerName, customerImage, merchantID };
    });
  };

  const userUpdateHandler = (customerName, customerImage) => {
    setUser((prevUser) => {
      return { ...prevUser, customerName, customerImage };
    });
  };

  const merchantCreateHandler = (merchantID) => {
    setUser((prevUser) => {
      return { ...prevUser, merchantID };
    });
  };

  return (
    <APIContext.Provider
      value={{ API_URL: "https://papi-katering.herokuapp.com/" }}
    >
      <CartContext.Provider value={{ cart, onUpdateCart: updateCartHandler }}>
        <UserContext.Provider
          value={{
            customerID: user.customerID,
            merchantID: user.merchantID,
            customerName: user.customerName,
            customerImage: user.customerImage,
            onUserLogin: setLoggedUserHandler,
            onUserUpdate: userUpdateHandler,
            onMerchantCreate: merchantCreateHandler,
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
