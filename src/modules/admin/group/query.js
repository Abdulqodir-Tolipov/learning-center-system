const GROUPS_QUERY = `
    select
        id,
        name
    from groups
    where deleted_at is null
    offset $1 fetch first $2 rows only
`
const COUNT_GROUPS = `
    select 
        count(id)
    from groups
    where deleted_at is null
`

const DELETE_GROUP = `
    update groups set
        deleted_at = current_timestamp
    where id = $1
    returning *
`

module.exports = {
    GROUPS_QUERY,
    COUNT_GROUPS,
    DELETE_GROUP
}