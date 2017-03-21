const production = process.env.NODE_ENV === 'production'

const express = {
  port: process.env.PORT || 3000,
  ip: production ? '0.0.0.0' : '127.0.0.1',
}

const mongodb = {
  port: process.env.MONGODB_PORT || 27017,
  host: process.env.MONGODB_HOST || 'localhost',
}

export default {
  production,
  express,
  mongodb,
}
