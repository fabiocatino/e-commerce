import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    cartActions,
    useCartItems,
    useTotalPrice
} from '../../services/cartSlice';
import { checkoutAction } from '../../services/checkoutSlice';
import { useAddOrderMutation } from '../../services/ordersApi';

const CardPaymentButton = () => {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);
	const [{ isResolved }] = usePayPalScriptReducer();
	const totalPrice = useTotalPrice();
	const orderItems = useCartItems();

	const [addOrder, { isLoading }] = useAddOrderMutation();
	const shippingInfo = useSelector(
		(state) => state.checkout.shippingInfo.shippingInfo
	);
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

	const createOrderByCard = (data, actions) => {
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
						admin_area_1: 'CA',
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
								admin_area_1: 'CA',
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
				paymentMethod: 'Debit/Credit Card',
			})
		);

		return actions.order.capture().then(function (details) {
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
			}).unwrap();
			// router.replace('/order/success');
			dispatch(checkoutAction.currStep(2));
			dispatch(cartActions.deleteCart());
		});
	}

	function onError(err) {
		console.log(err);
		setOnErrorMessage(err.toString());
	}

	return (
		<div style={{ paddingTop: 100 }}>
			<PayPalButtons 
				createOrder={createOrderByCard}
				// onShippingChange={onShippingChange}
				// onApprove={onApproveByCard}
				// onError={onErrorByCard}
				fundingSource={paypal.FUNDING.CARD}
			/>
		</div>
	);
};

export default CardPaymentButton;
