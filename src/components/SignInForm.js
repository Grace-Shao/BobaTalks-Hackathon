import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function SignInForm() {
  return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{textAlign: 'center'}}>
        <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
          Returning User?
        </Typography>
        <Typography sx={{padding: 2}} variant="h4" component="div">
          Sign In
        </Typography>
        <form>
                <label sx={{padding: 2}}>Email</label>
                <input type="text" id="email" name="email" />

                <label sx={{padding: 2}}>Password</label>
                <input sx={{paddingTop: 2}} type="text" id="pw" name="pw" />

                <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                type="submit"
                sx={{padding: 2}}
              >
                Sign in
              </Button>
            </form>
      </CardContent>
     
    </Card>
      </Container>
  );
}