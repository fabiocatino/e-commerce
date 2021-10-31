import React from 'react';
import BackToTop from './BackToTop';
import StickyFooter from './Footer';
import styles from './Layout.module.css';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Layout = ({ children }) => {
	return (
		<div id="back-to-top-anchor" className={styles.layout}>
			<Navbar />
			<div className={styles.searchbar}>
				<SearchBar></SearchBar>
			</div>
			{children}
			<div className={styles.footer}>
				<BackToTop></BackToTop>
				<StickyFooter></StickyFooter>
			</div>
		</div>
	);
};

export default Layout;
