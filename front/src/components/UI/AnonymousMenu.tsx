import React from 'react';
import { Button } from '@mui/material';
import Link from "next/link";

const AnonymousMenu = () => {
  return (
    <>
      <Link href="/register" color="inherit">
        Sign Up
      </Link>
      <Link href="/login" color="inherit">
        Sign In
      </Link>
    </>
  );
};

export default AnonymousMenu;