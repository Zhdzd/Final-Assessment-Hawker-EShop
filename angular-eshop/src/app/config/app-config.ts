export default {
 //client id- client id from okta website
 //issuer - okta domain from okta
  oidc: {
    clientId: '0oa405voqutEZegdm5d7',
    issuer: 'https://dev-06780521.okta.com/oauth2/default',
    //redirectUri: 'http://localhost:8080/login/callback',
    redirectUri: 'https://vespa-online-hawker.herokuapp.com/login/callback',

    scopes: ['openid', 'profile', 'email']
  }
}
