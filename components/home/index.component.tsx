'use client';

import React from 'react';
import { useAuthStore } from '@/store/auth.store';

const Home: React.FC = () => {
  const { authenticated } = useAuthStore();
  console.log('authenticated', authenticated);

  return (
    <div>
      <h1>Welcome to Charmmate</h1>
      <p>This is the home page of Charmmate website.</p>
    </div>
  );
};

export default Home;
