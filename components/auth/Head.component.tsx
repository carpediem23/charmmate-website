import React from 'react';
import NextHead from 'next/head';

const Head: React.FC = () => {
  return (
    <NextHead>
      <title>CharmMate | Schedule & Display Custom Web Content</title>
      <meta
        name="description"
        content="Create engaging web displays with CharmMate. Select from our premium content library, schedule your displays, and enhance your website with customizable animations."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
