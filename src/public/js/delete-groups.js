const deleteButton = document.querySelectorAll(".del")

for (let button of deleteButton) {
    button.onclick = async () => {
        let res = confirm('Are you sure!\nDelete this group?');
        if (res) {
            let {id} = button.dataset
            let response = await fetch('/admin/groups', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({groupId: id})
            })
            if (response.status = 204) {
                button.parentNode.parentNode.remove()
            } else {
                alert( (await response.json()).message )
            }
  
        }
    }
}