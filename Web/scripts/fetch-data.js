document.addEventListener("DOMContentLoaded", () => {
    const commentsContainer = document.getElementById("comments-container");
    const preloader = document.getElementById("preloader");

    const apiUrl = "https://jsonplaceholder.typicode.com/comments";
    let filterMode = 1;

    const fetchComments = async () => {
        try {
            preloader.style.display = "block";

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const comments = await response.json();
            const filteredComments = filterComments(comments);

            renderComments(filteredComments);
        } catch (error) {
            renderError(error.message);
        } finally {
             preloader.style.display = "none";
        }
    };

    const filterComments = (comments) => {
        const filtered = comments.filter((comment) => {
            return filterMode === 1 ? comment.id >= 100 : comment.id < 100;
        });
        filterMode = filterMode === 1 ? 2 : 1;
        return filtered.slice(0, 2);
    };

    const renderComments = (comments) => {
        commentsContainer.innerHTML = ""; 
        comments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `
                <h3>${comment.name}</h3>
                <p><strong>Email:</strong> ${comment.email}</p>
                <p>${comment.body}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    };

    const renderError = (message) => {
        commentsContainer.innerHTML = `
            <p class="error">⚠️ Что-то пошло не так: ${message}</p>
        `;
    };

    fetchComments();
});