import React from 'react';
import StickyFooter from './Footer';
import styles from './Layout.module.css';
import Navbar from './Navbar';

const Layout = (props) => {
	return (
		<div className={styles.layout}>
			{/* <Navbar /> */}
			{props.children}
			<div className={styles.footer}>
			{/* <StickyFooter></StickyFooter> */}
			</div>
		</div>
	);
};

export default Layout;
