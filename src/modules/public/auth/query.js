const VALIDATE = `
    select
        u.id
    from users u
    where u.username = $1 and
    u.password = crypt($2, u.password) and
    u.status = any($3::int[]);
`;

module.exports = {
  VALIDATE,
};
