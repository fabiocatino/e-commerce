import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
	step: {
		currentStep: 0,
		// cartItems: Cookies.get('cartItems')
		// 	? JSON.parse(Cookies.get('cartItems'))
		// 	: [],
	},
};

const checkoutSlice = createSlice({
	name: 'checkout',
	initialState: initialState,
	reducers: {
		nextStep: (state) => {
            if (state.currentStep > 3) {
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
