import { Button, NoSsr, Box, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutAction } from '../../services/checkoutSlice';
import { StepIcon } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const steps = ['Billing Details', 'Payment', 'Order placed'];

export default function HorizontalLinearStepper() {
	const dispatch = useDispatch();
	const activeStep = useSelector((state) => state.checkout.currentStep);

	const handleBack = (index) => (e) => {
		if (index === 0) {
			dispatch(checkoutAction.currStep(0));
		} else if (index === 1) {
			dispatch(checkoutAction.currStep(1));
		} else if (index === 2) {
			return;
		}
	};

	return (
		<Box sx={{ width: '100%' }}>
			<NoSsr>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};

						return (
							<Step key={label} {...stepProps}>
								{label === 'Order placed' && activeStep === 2 && (
									<StepLabel StepIconComponent={CheckIcon}>
										ORDER PLACED
									</StepLabel>
								)}
								<StepLabel {...labelProps}>
									<Button onClick={handleBack(index)}>{label}</Button>
								</StepLabel>
							</Step>
						);
					})}
				</Stepper>
			</NoSsr>
		</Box>
	);
}
