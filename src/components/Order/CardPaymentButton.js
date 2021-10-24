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
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [address, setAddress] = useState('');
	const [address2, setAddress2] = useState('');
	const [city, setCity] = useState('');
	const [postCode, setPostCode] = useState('');
	const [country, setCountry] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState(0);

	useEffect(() => {
		setFirstName(shippingInfo.firstName);
		setLastName(shippingInfo.lastName);
		setAddress(shippingInfo.address);
		setAddress2(shippingInfo.address2);
		setCity(shippingInfo.city);
		setPostCode(shippingInfo.postCode);
		setCountry(shippingInfo.country);
		setEmail(shippingInfo.email);
		setPhoneNumber(shippingInfo.phoneNumber);
	}, [
		firstName,
		lastName,
		address,
		address2,
		city,
		postCode,
		country,
		email,
		phoneNumber,
	]);

	useEffect(() => {
		dispatchPayPal({
			type: 'setLoadingStatus',
			value: 'pending',
		});
	}, [error]);

	const createOrder = (data, actions) => {
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
						address_line_2: address2 ? address2 : '',
						admin_area_2: city,
						admin_area_1: '',
						postal_code: postCode,
						country_code: 'GB',
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
								address_line_2: address2 ? address2 : '',
								admin_area_2: city,
								admin_area_1: '',
								postal_code: postCode,
								country_code: 'GB',
							},
						},
					},
				],
			})
			.then((orderID) => {
				return orderID;
			});
	};

	function onApprove(data, actions) {
		dispatch(
			cartActions.addItem({
				...orderItems[0],
			})
		);

		return actions.order.capture().then(function (details) {
			addOrder({
				billingInfo: {
					firstName: details.payer.name.given_name,
					lastName: details.payer.name.surname,
					address: details.payer.address.address_line_1,
					address1: details.payer.address.address_line_2,
					city: details.payer.address.admin_area_2,
					postCode: details.payer.address.postal_code,
					country: details.payer.address.country_code,
					email: details.payer.email_address,
				},
				shippingInfo: {
					firstName:
						details.purchase_units[0].shipping.name.full_name.split(' ')[0],
					lastName:
						details.purchase_units[0].shipping.name.full_name.split(' ')[1],
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
	}, [orderID]);

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
