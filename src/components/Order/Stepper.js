import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutAction } from '../../services/checkoutSlice';
import { Button } from '@mui/material';

const steps = ['Billing Details', 'Payment Method', 'Review Order'];

export default function HorizontalLinearStepper() {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.step.currentStep);
	const [activeStep, setActiveStep] = useState(0);

	useEffect(() => {
		setActiveStep(step);
	}, [step]);

	const handleBack = () => {
		if (activeStep === 2) {
			dispatch(checkoutAction.prevStep(2 - 1));
		} else if (activeStep === 1) {
			dispatch(checkoutAction.prevStep(1 - 1));
		}
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};

					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>
								<Button onClick={handleBack}>{label}</Button>
							</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</Box>
	);
}
