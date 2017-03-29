const production = process.env.NODE_ENV === 'production';

const express = {
  port: process.env.PORT || 3000,
  ip: production ? '0.0.0.0' : '127.0.0.1',
};

const mongodb = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject-dev',
};

const envCorsWhitelist = (process.env.CORS_WHITELIST || '').split(',');

const corsWhitelist = (envCorsWhitelist.length > 0)
  ? envCorsWhitelist
  : (production ? [] : ['http://localhost:4200']);

export default {
  production,
  express,
  mongodb,
  corsWhitelist,
};
