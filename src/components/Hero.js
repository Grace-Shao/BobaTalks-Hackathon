import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 12, sm: 12 },
          pb: { xs: 12, sm: 12 },
          backgroundColor: '#D3E9FF',
          // width:'100%',
          // height:'100%'
        }}
      >
        <img draggable="false" src={require('./mascot.png')} />
        {/* <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '100%' } }}>
        
          </Stack> */}
          
      </Container>
  );
}