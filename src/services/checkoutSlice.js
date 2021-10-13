import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
	step: {
		currentStep: 0,
	},
	shipping: {
		shippingInfo: Cookies.get('shippingInfo')
			? JSON.parse(Cookies.get('shippingInfo'))
			: [],
	},
};

const checkoutSlice = createSlice({
	name: 'checkout',
	initialState: initialState,
	reducers: {
		addShippingInfo: (state, action) => {
			const shippingInfo = action.payload;
			Cookies.set('shippingInfo', JSON.stringify(shippingInfo));
			return { ...state, shipping: { ...state.shipping, shippingInfo } };
		},

		deleteOrder: () => {
			Cookies.remove('shippingInfo');
		},
		nextStep: (state) => {
			if (state.currentStep > 2) {
				return;
			}
			state.step.currentStep += 1;
		},
		prevStep: (state) => {
			state.step.currentStep -= 1;
		},
	},
});

const { actions, reducer } = checkoutSlice;

export const checkoutAction = checkoutSlice.actions;

export default reducer;
