import { Toolbar, Typography } from '@mui/material/';
import React from 'react';

const EnhancedTableToolbar = () => {
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}
		>
			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				My Cart
			</Typography>
		</Toolbar>
	);
};

export default EnhancedTableToolbar;
