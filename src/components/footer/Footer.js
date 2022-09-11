import React from "react";
import styles from "./Footer.module.scss";

// переменная date тут лишняя, как по мне, можно сразу вытянуть год
const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return <div className={styles.footer}>&copy; {year} All Rights Reserved</div>;
};

export default Footer;
