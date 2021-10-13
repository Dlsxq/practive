import React, { FC, useEffect } from 'react';
import { Link, Prompt } from "react-router-dom"
import { globalHistory } from '../store/routeHistory';

interface IProps { }

const Home: FC<IProps> = ({ }) => {





  return <section>home

    <p>
     <button onClick={ () => globalHistory.push("/login")}>回到登陆页</button>

    </p>

    {/* <Prompt  message="你要走" /> */}

  </section>;
};

export default Home;
