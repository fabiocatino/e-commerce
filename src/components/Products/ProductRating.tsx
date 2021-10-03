import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ProductRating: React.FC<{ rating: number }> = (props) => {
	return (
		<Stack spacing={1}>
			<Rating
				sx={{ paddingBottom: 1 }}
				name="half-rating"
				defaultValue={2.5}
				precision={0.5}
				value={props.rating}
			/>
		</Stack>
	);
};

export default ProductRating;
