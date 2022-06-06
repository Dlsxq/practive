



import React from "react";
import { createRoot } from "react-dom/client";
import microApp from '@micro-zoe/micro-app'
import Main from "./router";

microApp.start();

createRoot(document.getElementById("root")).render(<Main />);
