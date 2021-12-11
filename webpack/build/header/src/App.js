import React, { Suspense } from "react";
const RemoteApp = React.lazy(() => import("app2/App"));
const Home = import("app2/Home");


Home.then(r => {
  console.log(r.home);
});


const App = () => {
  console.log(RemoteApp);

  return (
    <div>
      <div style={{
        margin: "10px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "greenyellow"
      }}>
        <h1>App1</h1>
      </div>
      <Suspense fallback={"loading..."}>
        <RemoteApp />
      </Suspense>
    </div>
  );
};


export default App;
