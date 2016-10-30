/**
 * Created by ranwahle on 10/10/2016.
 */

let config = require('../config');

exports.hasPermission = function(user){
    console.log('Permission for user ', user.value);
    return user.value.hasPermission || user.value.id === config.security.defaultAdminId;
}