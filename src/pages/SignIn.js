import * as React from 'react';
import Navbar from '../components/Navbar';
import SignInForm from '../components/SignInForm';


export default function SignIn() {
  return (
    <div>
      <Navbar/>
      <SignInForm disableGutters/>
    </div>
  );
}