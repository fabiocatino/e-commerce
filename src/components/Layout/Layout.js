import React from 'react';
import Navbar from './Navbar';
import StickyFooter from './Footer'
import styles from './Layout.module.css'

const Layout = (props) => {
	return (
		<div className={styles.layout}>
			<Navbar />
			{props.children}
            <StickyFooter></StickyFooter>
		</div>
	);
};

export default Layout;
