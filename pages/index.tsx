import { NextPage } from "next";
import styles from "@/styles/home.module.scss";

const Home: NextPage = () => {
  return (
    <video className={styles.video} autoPlay muted loop playsInline>
      <source src="/sz.mp4" type="video/mp4" />
    </video>
  );
};

export default Home;
