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
import Spinner from '../Layout/Spinner';

const PayPalButton = () => {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);
	const [{ isResolved }, dispatchPayPal] = usePayPalScriptReducer();
	const totalPrice = useTotalPrice();
	const orderItems = useCartItems();
	const router = useRouter();
	const [error, setError] = useState(false);

	const [addOrder, { isLoading }] = useAddOrderMutation();

	useEffect(() => {
		dispatchPayPal({
			type: 'setLoadingStatus',
			value: 'pending',
		});
	}, [error]);

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
		if (data.shipping_address.country_code !== 'GB') {
			return actions.reject();
		}
		return actions.resolve();
	}

	function onApprove(data, actions) {
		dispatch(cartActions.addItem({ ...orderItems[0] }));

		return actions.order.capture().then(function (details) {
			addOrder({
				shippingInfo: {
					firstName: details.payer.name.given_name,
					lastName: details.payer.name.surname,
					address: details.purchase_units[0].shipping.address.address_line_1,
					address2: details.purchase_units[0].shipping.address.address_line_2,
					city: details.purchase_units[0].shipping.address.admin_area_2,
					postCode: details.purchase_units[0].shipping.address.postal_code,
					country: details.purchase_units[0].shipping.address.country_code,
					email: details.payer.email_address,
				},
				orderItems: [...orderItems],
				totalPrice,
				isPaid: true,
				paymentMethod: 'Paypal',
			}).unwrap();
			dispatch(cartActions.deleteCart());
			dispatch(checkoutAction.nextStep(1 + 1));
			router.push('/order/checkout');
		});
	}

	function onError(err) {
		setError(true);
	}

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
