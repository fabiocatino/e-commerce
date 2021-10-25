import { Alert } from '@mui/material';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cartActions,
	useCartItems,
	useTotalPrice,
} from '../../services/cartSlice';
import { checkoutAction } from '../../services/checkoutSlice';
import { useAddOrderMutation } from '../../services/ordersApi';
import { orderAction } from '../../services/orderSlice';
import Spinner from '../Layout/Spinner';

const PayPalButton = () => {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);
	const [{ isResolved }, dispatchPayPal] = usePayPalScriptReducer();
	const totalPrice = useTotalPrice();
	const orderItems = useCartItems();
	const router = useRouter();
	const [error, setError] = useState(false);
	const [addOrder, { isLoading, data: orderID }] = useAddOrderMutation();
	const allowedCountries = ['GB', 'IT'];

	useEffect(() => {
		dispatchPayPal({
			type: 'setLoadingStatus',
			value: 'pending',
		});
	}, [error, dispatchPayPal]);

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
				return orderID;
			});
	};

	function onShippingChange(data, actions) {
		const {
			shipping_address: { country_code },
		} = data;

		if (!allowedCountries.includes(country_code)) {
			return actions.reject();
		}
		return actions.resolve();
	}

	function onApprove(data, actions) {
		dispatch(cartActions.addItem({ ...orderItems[0] }));

		return actions.order.capture().then(function (details) {
			
			const {
				payer: {
					name: { given_name: firstName, surname: lastName },
					email_address: email,
				},
				purchase_units: [
					{
						shipping: {
							address: {
								address_line_1: shipping_address_line_1,
								address_line_2: shipping_address_line_2,
								admin_area_2: shipping_admin_area_2,
								postal_code: shipping_postal_code,
								country_code: shipping_country_code,
							},
						},
					},
				],
			} = details;

			addOrder({
				shippingInfo: {
					firstName,
					lastName,
					address: shipping_address_line_1,
					address2: shipping_address_line_2,
					city: shipping_admin_area_2,
					postCode: shipping_postal_code,
					country: shipping_country_code,
					email,
				},
				orderItems: [...orderItems],
				totalPrice,
				isPaid: true,
				paymentMethod: 'Paypal',
			}).unwrap();
		});
	}

	function onError(err) {
		setError(true);
	}

	useEffect(() => {
		if (orderID !== undefined) {
			dispatch(orderAction.addOrderID(orderID._id));
			dispatch(checkoutAction.currStep(2));
			router.push('/order/checkout', '/order/checkout/step=success');
		}
	}, [orderID, dispatch, router]);

	return (
		<div>
			{error && (
				<Alert onClose={() => setError(false)} severity="error">
					Something went wrong.
				</Alert>
			)}
			{!isResolved && <Spinner />}
			{isResolved && (
				<div style={{ width: '262.98px' }}>
					<PayPalButtons
						style={{ shape: 'pill', height: 42 }}
						createOrder={createOrder}
						onShippingChange={onShippingChange}
						onApprove={onApprove}
						onError={onError}
						fundingSource={paypal.FUNDING.PAYPAL}
					/>
				</div>
			)}
		</div>
	);
};

export default PayPalButton;
