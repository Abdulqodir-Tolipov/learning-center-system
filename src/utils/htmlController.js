const path = require('path')

module.exports = (userInfo, body, header) => {
  userInfo = userInfo || {};
  body = body || {};
  header = header || {};

  // console.log(userInfo);
  // console.log(body);
  // console.log(header);

  let links
  let data

  if (userInfo.status == 'student') {
    links = [
      { link: '/groups', text: 'groups' },
    ];
  } else if (userInfo.status == 'admin' || userInfo.status == 'teacher' || userInfo.status == 'assistant'){
    links = [
      { link: '/admin', text: 'admin' },
      { link: '/groups', text: 'groups' },
      { link: '/teachers', text: 'teachers' },
      { link: '/assistants', text: 'assistants' },
    ]
  } else if (userInfo.status == 'admin') {
    links = []
  }

  if(path.basename(body.html, '.html') == 'table') {
    data = {
      tableName1: body.tableName1 || '',
      tableName2: body.tableName2 || '',
      table: body.table
    }
  } else if (path.basename(body.html, '.html') == 'login') {
    data = {
      errorMessage: body.errorMessage || null
    }
  } else if (path.basename(body.html, '.html') == 'admin') {
    data = {
      panel: body.panel || 'table-groups.html',
      data: {
        data: body.data || [],
        pages: body.pages || 0,
        page: body.page || 0
      }
    }
  }


  return [
   'index.html',
    {
      header: header.header || 'public/header.html',
      html: body.html || 'public/table.html',
      headerData: {
        links,
        input: userInfo.status ? true : false,
        isLoggedIn: userInfo.status ? true : false,
      },
      data
    }
  ]

};
