import { render, } from "react-dom";
import { StrictMode } from "react";
import "~/bootstrap.less";
import { BrowserRouter } from "react-router-dom";
import routerConf from "./routes/routerConf";
import { useRoutes } from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import "./views";


/* 
  1. 全局状态管理
  2. UI视图组件
  3. UI控制
*/
function BootStrap() {
  let routerElement = useRoutes(routerConf);

  return (
    <StrictMode>
      <ChakraProvider>
      <BrowserRouter>
        {routerElement}
      </BrowserRouter>
      </ChakraProvider>
    </StrictMode>
  );
}



const container = document.getElementById("bootstrap");

function bootStrap() {
  render(<BootStrap />, container);
}


export default bootStrap;
