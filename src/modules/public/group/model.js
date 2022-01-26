const db = require('../../../utils/postgres.js');
const GROUPS_QUERY = require('./query.js');

const get = async ({ studentId = 0, assistantId = 0 }, { group, status }) => {
  const groups = await db(false, GROUPS_QUERY, studentId, assistantId, group.length ? group : [0]);

  const table = {
    'group name': groups.map((group) => ({
      type: `link`,
      text: group.name,
      link: `/students?groupId=${group.id}`,
    })),
    teacher: groups.map((group) => ({
      type: `link`,
      text: group.teacher_fullname,
      link: `/students?teacherId=${group.teacher_id}`,
    })),
    assistants: groups.map((group) => ({
      type: `link`,
      text: 'assistants: ' + group.assistant_count,
      link: `/assistants?groupId=${group.id}`,
    })),
    'students count': groups.map((group) => ({
      type: `text`,
      text: group.student_count,
    })),
  };

  if(status == 'student') {
    table['teacher'] = groups.map((group) => ({type: `text`, text: group.teacher_fullname,
    }))
  }

  return {
    html: 'public/table.html',
    tableName1: `Groups: ${groups.length}`,
    tableName2: studentId ? `Student:${groups[0].student_fullname}` : assistantId ? `Assistant: ${groups[0].assistant_fullname}` : null,
    table,
  }
};

module.exports = {
  get,
};
