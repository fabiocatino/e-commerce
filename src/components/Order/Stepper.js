import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutAction } from '../../services/checkoutSlice';

const steps = ['Billing Details', 'Payment Method', 'Review Order'];

export default function HorizontalLinearStepper() {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.step.currentStep);
	const [activeStep, setActiveStep] = useState(0);

	useEffect(() => {
		setActiveStep(step);
	}, [step]);

	const handleNext = () => {
		dispatch(checkoutAction.nextStep(step + 1));
	};

	const handleBack = () => {
		dispatch(checkoutAction.prevStep(step - 1));
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};

					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>

			<React.Fragment>
				<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
					<Button
						color="inherit"
						disabled={activeStep === 0}
						onClick={handleBack}
						sx={{ mr: 1 }}
					>
						Back
					</Button>
					<Box sx={{ flex: '1 1 auto' }} />

					<Button onClick={handleNext}>
						{activeStep === steps.length - 1 ? 'Place order' : 'Next'}
					</Button>
				</Box>
			</React.Fragment>
		</Box>
	);
}
