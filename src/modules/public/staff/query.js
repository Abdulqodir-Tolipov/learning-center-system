const TEACHERS = `
    select distinct on (t.id)
        t.id,
        u.firstname || ' ' || u.lastname as fullname,
        u.contact,
        u.age,
        case
            when u.gender = 1 then 'erkak'
            else 'ayol'
        end as gender
    from users u
    join teachers t on t.user_id = u.id
    join groups g on g.teacher_id = t.id
    where u.status = 2 and
    g.id = any($1)
    order by t.id
`

const ASSISTANTS = `
    select
        a.id,
        u.firstname || ' ' || u.lastname as fullname,
        u.contact,
        u.age,
        case
            when u.gender = 1 then 'erkak'
            else 'ayol'
        end as gender,
        count( ag.group_id ) as group_count
    from users u
    join assistants a on a.user_id = u.id
    join assistant_groups ag on ag.assistant_id = a.id
    join groups g on g.id = ag.group_id
    where u.status = 3 and
    g.id = any($2) and
    case
        when $1 > 0 then ag.group_id = $1
        else true
    end
    group by a.id, u.firstname, u.lastname, u.contact, u.age, u.gender
    ;
`

module.exports = {
    TEACHERS,
    ASSISTANTS
}