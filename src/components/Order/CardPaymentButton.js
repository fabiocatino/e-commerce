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
import { useSession } from 'next-auth/react';

const CardPaymentButton = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);
	const [{ isResolved, isPending }, dispatchPayPal] = usePayPalScriptReducer();
	const totalPrice = useTotalPrice();
	const orderItems = useCartItems();
	const [error, setError] = useState(false);
	const [addOrder, { isLoading, data: orderID }] = useAddOrderMutation();
	const shippingInfo = useSelector(
		(state) => state.checkout.shippingInfo.shippingInfo
	);
	const { data: session, status } = useSession();

	useEffect(() => {
		dispatchPayPal({
			type: 'setLoadingStatus',
			value: 'pending',
		});
	}, [error, dispatchPayPal]);

	const createOrder = (data, actions) => {
		if (status === 'authenticated') {
			const {
				firstName,
				lastName,
				address,
				address2,
				city,
				postCode,
				country,
				email,
				phoneNumber,
			} = shippingInfo;

			return actions.order
				.create({
					intent: 'CAPTURE',
					payer: {
						name: {
							given_name: firstName,
							surname: lastName,
						},
						address: {
							address_line_1: address,
							address_line_2: address2 ?? '',
							admin_area_2: city,
							admin_area_1: '',
							postal_code: postCode,
							country_code: country === 'United Kingdom' ? 'GB' : 'IT',
						},
						email_address: email,
						phone: {
							phone_type: 'MOBILE',
							phone_number: {
								national_number: phoneNumber,
							},
						},
					},
					purchase_units: [
						{
							amount: {
								value: totalPrice,
								currency_code: 'GBP',
							},
							shipping: {
								address: {
									address_line_1: address,
									address_line_2: address2 ?? '',
									admin_area_2: city,
									admin_area_1: '',
									postal_code: postCode,
									country_code: country === 'United Kingdom' ? 'GB' : 'IT',
								},
							},
						},
					],
				})
				.then((orderID) => {
					return orderID;
				});
		} else {
			return actions.order
				.create({
					purchase_units: [
						{
							amount: {
								value: totalPrice,
								currency_code: 'GBP',
							},
						},
					],
				})
				.then((orderID) => {
					return orderID;
				});
		}
	};
	function onApprove(data, actions) {
		dispatch(
			cartActions.addItem({
				...orderItems[0],
			})
		);

		return actions.order.capture().then(function (details) {
			const {
				payer: {
					name: { given_name, surname },
					address: {
						address_line_1,
						address_line_2,
						admin_area_2,
						postal_code,
						country_code,
					},
					email_address,
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
				billingInfo: {
					firstName: given_name,
					lastName: surname,
					address: address_line_1,
					address1: address_line_2,
					city: admin_area_2,
					postCode: postal_code,
					country: country_code,
					email: email_address,
				},

				shippingInfo: {
					firstName:
						details.purchase_units[0].shipping.name.full_name.split(' ')[0],
					lastName:
						details.purchase_units[0].shipping.name.full_name.split(' ')[1],
					address: shipping_address_line_1,
					address2: shipping_address_line_2,
					city: shipping_admin_area_2,
					postCode: shipping_postal_code,
					country: shipping_country_code,
					email: email_address,
				},
				orderItems: [...orderItems],
				totalPrice,
				isPaid: true,
				paymentMethod: 'Card',
			}).unwrap();
		});
	}

	function onError(err) {
		setError(true);
	}

	useEffect(() => {
		if (orderID !== undefined) {
			dispatch(orderAction.addOrderID(orderID._id));
			dispatch(checkoutAction.nextStep(step + 1));
			router.push('/order/checkout', '/order/checkout/step=success');
		}
	}, [orderID, router, step, dispatch]);

	return (
		<>
			{!isResolved && <Spinner />}
			{isResolved && (
				<div style={{ paddingTop: 100 }}>
					{error && (
						<Alert
							sx={{ marginBottom: 5 }}
							onClose={() => setError(false)}
							severity="error"
						>
							Something went wrong.
						</Alert>
					)}
					<PayPalButtons
						createOrder={createOrder}
						// onShippingChange={onShippingChange}
						onApprove={onApprove}
						onError={onError}
						fundingSource={paypal.FUNDING.CARD}
					/>
				</div>
			)}
		</>
	);
};
export default CardPaymentButton;
