import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5}}>
      <CircularProgress size={80} />
    </Box>
  );
}