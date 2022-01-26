const { verify } = require('../utils/jwt.js');
const db = require('../utils/postgres.js');

const STATUS_QUERY = `
    select 
        case
            when status = 1 then 'admin'
            when status = 2 then 'teacher'
            when status = 3 then 'assistant'
            when status = 4 then 'student'
        end as status
    from users where id = $1
`;

const STUDENT_GROUPS = `
    select
        sg.group_id
    from student_groups sg
    join students s on s.id = sg.student_id
    join users u on u.id = s.user_id
    where u.id = $1
`;

const TEACHER_GROUPS = `
    select
      g.id
    from groups g
    join teachers t on t.id = g.teacher_id
    join users u on u.id = t.user_id
    where u.id = $1
`

const ASSISTANT_GROUPS = `
    select
      ag.group_id
    from assistant_groups ag
    join assistants a on a.id = ag.assistant_id
    join users u on u.id = a.user_id
    where u.id = $1
`

const ADMIN = `
    select
      id
    from groups
`

module.exports = async (req, res, next) => {
  try {
    if (!(req.url == '/' || req.url == '/login') && !req.cookies.token) return res.redirect('/')
    if ((req.url == '/' || req.url == '/login') && !req.cookies.token) return next();

    const token = req.cookies.token;
    const payload = verify(token);
    const userId = payload.id;
    
    // if (req.url == '/' && req.cookies.token) return next();
    if (req.cookies.token && req.url == '/login') return res.redirect('/');
    

    let userStatus = await db(true, STATUS_QUERY, userId);
    let {status} = userStatus

    if (status == 'student') {
        let studentGroups = await db(false, STUDENT_GROUPS, userId);
        console.log(studentGroups);
        let group = studentGroups.map((groups) => groups.group_id);

        req.userInfo = {
            userId,
            status,
            group
        }
        return next()
    } else if (status == 'teacher') {
      let teacherGroups = await db(false, TEACHER_GROUPS, userId);
      let group = teacherGroups.map((groups) => groups.id);

      req.userInfo = {
          userId,
          status,
          group
      }
    } else if (status == 'assistant') {
      let assistantGroups = await db(false, ASSISTANT_GROUPS, userId);
      let group = assistantGroups.map((groups) => groups.group_id);

      req.userInfo = {
          userId,
          status,
          group
      }
    } else if (status == 'admin') {
      let adminRole = await db(false, ADMIN);
      let group = adminRole.map((groups) => groups.id);

      req.userInfo = {
          userId,
          status,
          group
      }
    }
    next()
    
  } catch (error) {
    res.render('index.html', {
      header: 'public/header.html',
      html: 'public/error.html',
      headerData: {
        links,
        input: false,
        isLoggedIn: false
      },
      data: {
        message: error.message,
      },
    });
  }
};

