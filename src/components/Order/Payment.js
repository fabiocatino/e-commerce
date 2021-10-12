import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutAction } from '../../services/checkoutSlice';

const Payment = () => {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.step.currentStep);

	return (
		<div>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et doloremque
			quae facere vel ullam a unde enim illo voluptatem, magni aperiam
			consectetur perspiciatis? Fuga, quo omnis a eaque tempora labore sint
			quidem vel est voluptatum libero ea corporis fugit, quasi molestiae at.
			Alias repudiandae non molestias eos excepturi id ut dolores rerum dolor
			modi porro distinctio, atque minima? Ut nesciunt qui quisquam officiis
			perferendis. Necessitatibus unde optio quidem suscipit vel rem repellat
			officia repudiandae mollitia reprehenderit voluptatem ratione, tenetur
			saepe nulla dolore harum voluptas delectus eos consectetur sequi
			dignissimos qui. Laudantium blanditiis quo, magni animi adipisci dolor
			voluptas sequi maxime?
		</div>
	);
};

export default Payment;
