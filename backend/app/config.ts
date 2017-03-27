const production = process.env.NODE_ENV === 'production';

const express = {
  port: process.env.PORT || 3000,
  ip: production ? '0.0.0.0' : '127.0.0.1',
};

const mongodb = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject-dev',
};

export default {
  production,
  express,
  mongodb,
};
