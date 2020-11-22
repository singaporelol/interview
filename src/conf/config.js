const crypto = require('crypto')
var assert = require('assert');
/**
 * @description storage configuration
 * @author Wei Xueqian
 * 
 */


let k = 'Weixueqian202020';

var algorithm = 'aes256'; 

var encrypted='44b41a441595a3d985b022e8d1838bd7ad1b3d2b5a911fe472cbed2d53d70c14c2ef873e0c8bb1b9486057b51aa228c4050349dc8af01fc59945506eaece90ea17fe9b92e7cce6d21b025ed12d553f3060b8a40e1349d140e96e06e6c5614aeede67185a12cdc89699c8071e7e662c8971dbb52c3e81a919ba49366221605afb';
var decipher = crypto.createDecipher(algorithm, k);
var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
let obj=JSON.parse(decrypted);

module.exports = {
  ...obj
}
