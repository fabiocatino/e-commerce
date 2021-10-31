import React from 'react';
import StickyFooter from './Footer';
import styles from './Layout.module.css';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Layout = (props) => {
	return (
		<div className={styles.layout}>
			<Navbar />
			<div className={styles.searchbar}>
				<SearchBar></SearchBar>
			</div>
			{props.children}
			<div className={styles.footer}>
				<StickyFooter></StickyFooter>
			</div>
		</div>
	);
};

export default Layout;
