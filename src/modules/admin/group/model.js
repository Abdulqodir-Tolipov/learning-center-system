const db = require('../../../utils/postgres.js');
const {GROUPS_QUERY, COUNT_GROUPS, DELETE_GROUP} = require('./query.js');

const get = async ({page = 1}) => {

  let limit = 2
  const { count } = await db(true, COUNT_GROUPS);
  let pages = Math.ceil(count / limit)

  const groups = await db(false, GROUPS_QUERY, (page - 1) * limit, limit);

  return {
    html: 'private/admin.html',
    panel: 'table-groups.html',
    data: groups,
    pages,
    page
  }
};

const remove = async ({groupId}) => {
  let deletedGroup = await db(true, DELETE_GROUP, groupId)
  return deletedGroup
}

module.exports = {
  get,
  remove
};
