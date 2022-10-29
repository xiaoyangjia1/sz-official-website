import { NextPage } from "next";
import styles from "@/styles/home.module.scss";

const Home: NextPage = () => {
  return (
    <div className="pageWarp">
      <video className={styles.video} autoPlay muted loop playsInline>
        <source src="/sz.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Home;
