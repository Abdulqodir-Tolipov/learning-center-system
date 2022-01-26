module.exports = `
    select distinct on (g.id)
        g.id,
        g.name,
        u.firstname || ' ' || u.lastname as teacher_fullname,
        su.firstname || ' ' || su.lastname as student_fullname,
        au.firstname || ' ' || au.lastname as assistant_fullname,
        t.id as teacher_id,
        (
            select count(student_id) from student_groups where group_id = g.id
        ) as student_count,
        (
            select count(assistant_id) from assistant_groups where group_id = g.id
        ) as assistant_count
    from groups g
    join student_groups sg on sg.group_id = g.id
    join students s on s.id = sg.student_id
    join users su on su.id = s.user_id
    join teachers t on t.id = g.teacher_id
    join users u on u.id = t.user_id
    join assistant_groups ag on ag.group_id = g.id
    join assistants a on a.id = ag.assistant_id
    join users au on au.id = a.user_id
    where g.id = any($3) and
        case
            when $1 > 0 then s.id = $1
            else true
        end and
        case
            when $2 > 0 then ag.assistant_id = $2
            else true 
        end
    order by g.id asc
`;
