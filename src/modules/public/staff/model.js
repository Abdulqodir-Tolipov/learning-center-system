const db = require('../../../utils/postgres.js');
const {TEACHERS, ASSISTANTS} = require('./query.js')

const get_teachers = async ({ group, status }) => {
  const teachers = await db(false, TEACHERS, group);

  const table = {
    'full name': teachers.map((teacher) => ({
      type: `link`,
      text: teacher.fullname,
      link: `/students/?teacherId=${teacher.id}`,
    })),
    contact: teachers.map((teacher) => ({
      type: `link`,
      text: teacher.contact,
      link: `tel:+${teacher.contact}`,
    })),
    age: teachers.map((teacher) => ({
      type: `text`,
      text: teacher.age,
    })),
    gender: teachers.map((teacher) => ({
      type: `text`,
      text: teacher.gender,
    })),
  };

  return {
    html: 'public/table.html',
    tableName1: `Teachers: ${teachers.length}`,
    table,
  };
};

const get_assistants = async ({groupId = 0}, {group}) => {
  const assistants = await db(false, ASSISTANTS,
    group.includes(+groupId) ? groupId : 0,
    group
  );

  const table = {
    'full name': assistants.map((assistant) => ({
      type: `text`,
      text: assistant.fullname,
    })),
    contact: assistants.map((assistant) => ({
      type: `link`,
      text: assistant.contact,
      link: `tel:+${assistants.contact}`,
    })),
    age: assistants.map((assistant) => ({
      type: `text`,
      text: assistant.age,
    })),
    gender: assistants.map((assistant) => ({
      type: `text`,
      text: assistant.gender,
    })),
    groups: assistants.map((assistant) => ({
      type: `link`,
      text: `groups: ${assistant.group_count}`,
      link: `/groups?assistantId=${assistant.id}`
    })),
  };
  

  return {
    html: 'public/table.html',
    tableName1: `Assistants: ${assistants.length}`,
    table,
  };
};

module.exports = {
  get_teachers,
  get_assistants
};
