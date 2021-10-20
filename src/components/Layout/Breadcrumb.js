import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


export default function Breadcrumb() {
	return (
		<div role="presentation">
			<Breadcrumbs aria-label="breadcrumb">
				<Link underline="hover" color="inherit" href="/">
					MUI
				</Link>
				<Link
					underline="hover"
					color="inherit"
					href="/getting-started/installation/"
				>
					Core
				</Link>
				<Link
					underline="hover"
					color="text.primary"
					href="/components/breadcrumbs/"
					aria-current="page"
				>
					Breadcrumbs
				</Link>
			</Breadcrumbs>
		</div>
	);
}
