import React from 'react';
import Navbar from './Navbar';
import StickyFooter from './Footer';
import styles from './Layout.module.css';
import SearchBar from './SearchBar';

const Layout = (props) => {
	return (
		<div className={styles.layout}>
			<Navbar />
			<div className={styles.searchbar}>
				{/* <SearchBar></SearchBar> */}
			</div>
			{props.children}
			<StickyFooter></StickyFooter>
		</div>
	);
};

export default Layout;
