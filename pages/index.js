import Head from 'next/head';
import styles from './Home.module.css';
import { getSession } from 'next-auth/react';

const IndexPage = (props) => {
	return <div className={styles.container}></div>;
};

export default IndexPage;
