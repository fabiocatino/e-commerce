import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ColorButtons(props) {
	return (
		<Stack direction="row" spacing={2}>
			<Button
				variant="contained"
				color="success"
				size="large"
				sx={{ borderRadius: 50 }}
				onClick={props.onClick}
			>
				ADD TO CART
			</Button>
		</Stack>
	);
}
