import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
	currentStep: 0,

	shippingInfo: Cookies.get('shippingInfo')
		? JSON.parse(Cookies.get('shippingInfo'))
		: [],
};

const checkoutSlice = createSlice({
	name: 'checkout',
	initialState: initialState,
	reducers: {
		addShippingInfo: (state, action) => {
			const shippingInfo = action.payload;
			Cookies.set('shippingInfo', JSON.stringify(shippingInfo));
			return {
				...state,
				shippingInfo: { ...state.shippingInfo, shippingInfo },
			};
		},

		nextStep: (state) => {
			if (state.currentStep > 2) {
				return;
			}
			state.currentStep += 1;
		},
		prevStep: (state) => {
			state.currentStep -= 1;
		},
	},
});

const { actions, reducer } = checkoutSlice;

export const checkoutAction = checkoutSlice.actions;

export default reducer;
