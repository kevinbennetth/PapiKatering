import { createContext } from "react";

const APIContext = createContext({
  API_URL: "",
});

export const APIContextProvider = (props) => {
  return (
    <APIContext.Provider value={{ API_URL: "http://localhost:8080/" }}>
      {props.children}
    </APIContext.Provider>
  );
};

export default APIContext;
