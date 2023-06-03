import React from 'react';
import { Route } from 'react-router-dom';
import classes from "./Home.module.css";

const Home = () => {
  const tracks = [
    {
      id: "m1",
      date: "JULY16",
      title: "DETROIT, MI",
      description: "DTE ENERGY MUSIC THEATRE",
    },
    {
      id: "m2",
      date: "JUL19",
      title: "TORONTO,ON",
      description: "BUDWEISER STAGE",
    },
    {
      id: "m3",
      date: "JUL 22",
      title: "BRISTOW, VA",
      description: "JIGGY LUBE LIVE",
    },
    {
      id: "m4",
      date: "JUL 29",
      title: "PHOENIX, AZ",
      description: "AK-CHIN PAVILION",
    },
    {
      id: "m5",
      date: "AUG 2",
      title: "LAS VEGAS, NV",
      description: "T-MOBILE ARENA",
    },
    {
      id: "m6",
      date: "AUG 7",
      title: "CONCORD, CA",
      description: "CONCORD PAVILION",
    },
  ];

  const list = tracks.map((item) => {
    return (
      <li className={classes["tour-item"]} key={item.id}>
        <span className={classes["tour-date"]}>{item.date}</span>
        <span className={classes["tour-description"]}>{item.title}</span>
        <span className={classes["tour-place"]}>{item.description}</span>
        <button className={classes.button}>BUY TICKET</button>
      </li>
    );
  });

  return (
    <section className={classes.home}>
      
      <h2>TOURS</h2>
      <div className={classes.wrapper}>{list}</div>
    </section>
  );
};
export default Home;