const STUDENTS = `
    select
        g.id as group_id,
        s.id,
        u.firstname || ' ' || u.lastname as fullname,
        u.contact,
        u.age,
        g.name as group_name,
        (select sum(score) from scores where student_id = s.id and group_id = $1) as student_score,
        (select firstname || ' ' || lastname from users where t.user_id = id) as teacher_name,
        case
            when u.gender = 1 then 'erkak'
            else 'ayol'
        end as gender
    from users u
    join students s on s.user_id = u.id
    join student_groups sg on sg.student_id = s.id
    join groups g on g.id = sg.group_id
    join teachers t on t.id = g.teacher_id
    where g.id = any($3) and
    case
        when $1 > 0 then g.id = $1
        else g.id = 0
    end or
    case
        when $2 > 0 then t.id = $2
        else t.id = 0
    end
    order by student_score desc
`;

const STUDENT_SCORE = `
    select distinct on (s.score)
        s.id,
        s.score,
        s.score_desc,
        to_char(s.created_at, 'yyyy-mm-dd hh24:mi') as created_at,
        u.firstname || ' ' || u.lastname as fullname,
        g.name as group_name
    from scores s
    join students st on st.id = s.student_id
    join users u on st.user_id = u.id
    join groups g on g.id = s.group_id
    where s.student_id = $1 and s.group_id = $2 and g.id = any($3)
    order by s.score
`

const SEARCH_STUDENT = `
    select distinct on(s.id)
        s.id,
        u.firstname || ' ' || u.lastname as fullname,
        u.contact,
        u.age,
        (select sum(score) from scores where student_id = s.id) as student_score
    from students s
    join users u on u.id = s.user_id
    join student_groups sg on sg.student_id = s.id
    where sg.group_id = any($2) and
    (u.firstname || ' ' || u.lastname  ilike $1 or
    u.contact ilike $1)
    order by s.id
`

module.exports = {
    STUDENTS,
    STUDENT_SCORE,
    SEARCH_STUDENT
}