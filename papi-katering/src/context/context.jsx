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

export const ContextProvider = (props) => {

  const [cart, dispatchCart] = useReducer(cartReducer, {
    packetid: "",
    merchantid: "",
    customerid: "",
    orderdaycount: "",
    orderquantity: "",
  });

  const [user, setUser] = useState({ customerID: "", merchantID: "" });

  const updateCartHandler = (value) => {
    dispatchCart(value);
  };

  const setLoggedUser = (customerID, merchantID) => {
    setUser({ customerID, merchantID });
  };

  return (
    <APIContext.Provider value={{ API_URL: "http://localhost:8080/" }}>
      <CartContext.Provider value={{ cart, onUpdateCart: updateCartHandler }}>
        <UserContext.Provider
          value={{
            customerID: user.customerID,
            merchantID: user.merchantID,
            onUserLogin: setLoggedUser,
          }}
        >
          {props.children}
        </UserContext.Provider>
      </CartContext.Provider>
    </APIContext.Provider>
  );
};

export { APIContext, CartContext, UserContext };
