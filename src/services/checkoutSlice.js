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
		currStep: (state, action) => {
			if (state.currentStep === 0 && action.payload === 1) {
				return;
			} else if (state.currentStep === 1 && action.payload === 2) {
				return;
			}
			state.currentStep = action.payload;
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
