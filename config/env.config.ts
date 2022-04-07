import AppConfig from './config.interface';

export default (): AppConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expriresIn: '1d',
  },
});
