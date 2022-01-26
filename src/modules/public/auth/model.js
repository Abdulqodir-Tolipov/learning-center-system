const db = require('../../../utils/postgres.js');
const { VALIDATE } = require('./query.js');

const validate = async ({ status, username, password }) => {
  let user = await db(true, VALIDATE, username, password, 
    status == 1 ? '{ 4 }' :
    status == 2 ? '{ 2, 3 }' :
    status == 3 ? '{ 1 }' : '{ 0 }'
  );

  return user

};


module.exports = {
  validate,
};
