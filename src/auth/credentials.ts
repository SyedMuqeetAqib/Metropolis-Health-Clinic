export default () => ({
    secret:process.env.JWTSECRET,
    signOptions:{
      expiresIn:'30m'
    }
  });