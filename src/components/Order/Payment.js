import { Button } from '@mui/material';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, useCartItems } from '../../services/cartSlice';
import { useTotalPrice } from '../../services/cartSlice';
import { checkoutAction } from '../../services/checkoutSlice';
import { useAddOrderMutation } from '../../services/ordersApi';
import Spinner from '../Layout/Spinner';
import styles from './Payment.module.css';

const Payment = () => {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);
	const [{ isResolved }] = usePayPalScriptReducer();
	const totalPrice = useTotalPrice();
	const orderItems = useCartItems();
	const shippingInfo = useSelector(
		(state) => state.checkout.shippingInfo.shippingInfo.shippingInfo
	);
	const [addOrder, { isLoading }] = useAddOrderMutation();

	const onClickHandler = () => {
		dispatch(checkoutAction.nextStep(step + 1));
	};

	const createOrder = (data, actions) => {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: {
							value: totalPrice,
						},
					},
				],
			})
			.then((orderID) => {
				// setOrderID(orderID);
				return orderID;
			});
	};

	function onApprove(data, actions) {
		console.log(data)
		dispatch(
			cartActions.addItem({ ...orderItems[0], paymentMethod: 'Paypal' })
		);
		console.log('Approved');
		return actions.order.capture().then(function (details) {
			addOrder({
				shippingInfo,
				orderItems: [...orderItems],
				totalPrice,
				isPaid: true,
			}).unwrap();
		});
	}

	// try {
	// 	await addOrder({
	// 		shippingInfo,
	// 		orderItems: [...orderItems],
	// 		totalPrice,
	// 	}).unwrap();
	// 	dispatch(cartActions.deleteCart());
	// } catch (error) {
	// 	console.log(error);
	// }

	function onError(err) {
		console.log(err);
		setOnErrorMessage(err.toString());
	}

	return (
		<div style={{ paddingTop: 40 }}>
			{!isResolved && <Spinner />}
			{isResolved && (
				<>
					<PayPalButtons
						onApprove={onApprove}
						onError={onError}
						createOrder={createOrder}
						fundingSource={paypal.FUNDING.PAYPAL}
					/>
					<PayPalButtons fundingSource={paypal.FUNDING.CARD} />
				</>
			)}

			<Button
				onClick={onClickHandler}
				type="submit"
				variant="contained"
				color="success"
				className={styles['submit-button']}
				size="large"
			>
				REVIEW YOUR ORDER
			</Button>
		</div>
	);
};

export default Payment;
