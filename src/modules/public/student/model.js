const db = require('../../../utils/postgres.js');
const { STUDENTS, STUDENT_SCORE, SEARCH_STUDENT } = require('./query.js');

const get = async ({ groupId = 0, teacherId = 0 }, { group }) => {
  const students = await db(false, STUDENTS,
    group.includes(+groupId) ? groupId : 0,
    teacherId,
    group
  );

  const table = {
    'full name': students.map((student) => ({
      type: `link`,
      text: student.fullname,
      link: `/students/${student.id + '/' + student.group_id}`,
    })),
    age: students.map((student) => ({
      type: `text`,
      text: student.age,
    })),
    contact: students.map((student) => ({
      type: `link`,
      text: student.contact,
      link: `tel:+${student.contact}`,
    })),
    groups: students.map((student) => ({
      type: `link`,
      text: 'groups',
      link: `/groups?studentId=${student.id}`,
    })),
    'total score': students.map((student) => ({
      type: `text`,
      text: student.student_score,
    })),
  };

  if (!groupId) delete table['total score'];
  if (teacherId)
    table['full name'] = students.map((student) => ({
      type: `text`,
      text: student.fullname,
    }));

  return {
    html: 'public/table.html',
    tableName2: groupId && students.length ? `Group: ${students[0].group_name}` : teacherId && students.length ? `Teacher: ${students[0].teacher_name}` : '',
    tableName1: `Students: ${students.length}`,
    table,
  };
};

const get_score = async ({ studentId, groupId }, { group }) => {
  const student_score = await db(false, STUDENT_SCORE, 
    studentId, 
    group.includes(+groupId) ? groupId : 0,
    group
  );

  const table = {
    score: student_score.map((score) => ({
      type: `text`,
      text: score.score,
    })),
    description: student_score.map((score) => ({
      type: `text`,
      text: score.score_desc,
    })),
    date: student_score.map((score) => ({
      type: `text`,
      text: score.created_at,
    })),
  };

  return {
    html: 'public/table.html',
    tableName1: `Student: ${student_score[0].fullname}`,
    tableName2: `Group: ${student_score[0].group_name}`,
    table,
  };
};

const search = async ({ studentSearch }, { group }) => {
  const students = await db(false, SEARCH_STUDENT, `%${studentSearch}%`, group);

  const table = {
    'full name': students.map((student) => ({
      type: `text`,
      text: student.fullname,
    })),
    age: students.map((student) => ({
      type: `text`,
      text: student.age,
    })),
    contact: students.map((student) => ({
      type: `link`,
      text: student.contact,
      link: `tel:+${student.contact}`,
    })),
    groups: students.map((student) => ({
      type: `link`,
      text: 'groups',
      link: `/groups?studentId=${student.id}`,
    })),
  };

  return {
    html: 'public/table.html',
    tableName1: `Result: ${students.length}`,
    tableName2: ``,
    table,
  };
};

module.exports = {
  get,
  get_score,
  search,
};
