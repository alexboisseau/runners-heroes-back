export default interface AppConfig {
  port: number;
  jwt: {
    secret: string;
    expriresIn: string;
  };
}
