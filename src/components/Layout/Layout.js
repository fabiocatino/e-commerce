import React from 'react';
import Navbar from './Navbar';
import StickyFooter from './Footer'

const Layout = (props) => {
	return (
		<div>
			<Navbar />
			{props.children}
            <StickyFooter></StickyFooter>
		</div>
	);
};

export default Layout;
