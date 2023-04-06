const newFormHandler = async (event) => {
    event.preventDefault();
    console.log('NEW FORM HANDLER IS RUNNING')
    const title = document.querySelector('#comment-title').value.trim();
    const description = document.querySelector('#comment-text').value.trim();
    const post_id = event.target.getAttribute('data-id');
    alert(title + description + post_id);
    if (title && description && post_id) {
        console.log("if is running...++++++++++==========****************")
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ title, description, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to post comment');
        }
    }
    else {
        console.log('IF IT DID NOT RUN ((((((((((((((((((((((((((((')
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to delete comment');
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.comment-list')
    .addEventListener('click', delButtonHandler);
