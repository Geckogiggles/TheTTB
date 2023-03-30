const newFormHandler = async (event) => {
    event.preventDefault();
    console.log('%c Oh my heavens! ', 'background: #222; color: #bada55')

    const title = document.querySelector('#comment-title').value.trim();
    const description = document.querySelector('#comment-text').value.trim();

    if (title && description) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to post comment');
        }
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
