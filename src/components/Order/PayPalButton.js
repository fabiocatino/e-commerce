import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import React from 'react';
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
	const [{ isResolved }] = usePayPalScriptReducer();
	const totalPrice = useTotalPrice();
	const orderItems = useCartItems();
	const router = useRouter();

	const [addOrder, { isLoading }] = useAddOrderMutation();

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

	function onShippingChange(data, action) {
		//
	}

	function onApprove(data, actions) {
		dispatch(cartActions.addItem({ ...orderItems[0] }));

		return actions.order.capture().then(function (details) {
			console.log({ details });
			addOrder({
				shippingInfo: {
					firstName: details.payer.name.given_name,
					lastName: details.payer.name.surname,
					address:
						details.purchase_units[0].shipping.address.address_line_1 +
						(details.purchase_units[0].shipping.address.address_line_2 ===
						'undefined'
							? details.purchase_units[0].shipping.address.address_line_2
							: ''),
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

			dispatch(checkoutAction.currStep(2));
			router.push('/order/checkout');
			dispatch(cartActions.deleteCart());
		});
	}

	function onError(err) {
		console.log(err);
		setOnErrorMessage(err.toString());
	}

	return (
		<div>
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
