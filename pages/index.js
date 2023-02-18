import { useState } from "react";
import IconChevronDoubleRight from "../component/Icon";
import styles from "../styles/Home.module.css";

export default function Home({ jobs }) {
  const [currentTab, setCurrentTab] = useState(0);

  // if data could not be loaded on the server
  if (!jobs) {
    return (
      <main className={styles.main}>
        <p>There was an error loading this page</p>
      </main>
    );
  }

  const { dates, title, duties } = jobs[currentTab];

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h3>
          <span>/ </span>Experience
        </h3>
        <div className={styles.underline}></div>
      </div>
      <div className={styles.tabs_container}>
        {/* button container/ tab selector */}
        <section className={styles.btn_container}>
          {jobs.map(({ company }, index) => (
            <button
              key={index}
              className={
                index === currentTab
                  ? `${styles.btn} ${styles.active_btn}`
                  : styles.btn
              }
              onClick={() => setCurrentTab(index)}
            >
              {company}
            </button>
          ))}
        </section>
        {/* tab content */}
        <section className={styles.job_details}>
          <h4>{title}</h4>
          <p className={styles.date}>
            <span>{dates}</span>
          </p>
          {duties.map((duty, index) => (
            <p key={index} className={styles.duty}>
              <span className={styles.icon}>
                <IconChevronDoubleRight />
              </span>
              {duty}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  try {
    const resp = await fetch("https://course-api.com/react-tabs-project");
    if (!resp.ok) {
      //if data could not be fetched, throw this error
      throw new Error("There was an error loading this page");
    }
    //when data is done fetching
    const jobs = await resp.json();
    return {
      props: { jobs },
    };
  } catch (error) {
    console.log(error);
    //return empty props if data was not fetched
    return {
      props: {},
    };
  }
}
