import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ProductRating = (props) => {
	return (
		<Stack spacing={1}>
			<Rating
				sx={{ paddingBottom: 1 }}
				name="half-rating"
				defaultValue={2.5}
				precision={0.5}
				value={props.rating}
				readOnly={props.readOnly ? true : false}
			/>
		</Stack>
	);
};

export default ProductRating;
