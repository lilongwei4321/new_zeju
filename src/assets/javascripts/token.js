//时间
export function Token(num){
  var date = Number(Math.random().toString().substr(3) + Date.now()).toString(36);
  // Header
  var oHeader = {alg: 'HS256', typ: 'JWT'};
  // Payload
  var oPayload = {};
  var tNow = KJUR.jws.IntDate.get('now');
  var tEnd = KJUR.jws.IntDate.get('now + 1day');
  //jwt签发者
  oPayload.iss = "http://foo.com";
  //jwt所面向的用户
  oPayload.sub = "mailto:mike@foo.com";
  oPayload.nbf = tNow;
  oPayload.iat = tNow;
  oPayload.exp = tEnd;
  //jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
  oPayload.jti = num+date;

  oPayload.aud = "http://foo.com/employee";
  // Sign JWT, password=616161
  var sHeader = JSON.stringify(oHeader);
  var sPayload = JSON.stringify(oPayload);
  // console.log(KJUR.jws.JWS.sign)
  var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "zeju@2018");
  return sJWT;
}
export default {
  Token
}