const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

const blogContainer = document.getElementById("blog-posts");
const homeContainer = document.getElementById("home-posts");
const filterButtons = document.querySelectorAll(".filter-link");

function createPostCard(post) {
  return `
    <article class="post-card">
      <a href="${post.link}">
        <img src="${post.image}" alt="${post.title}">
        <div class="post-card-content">
          <h3>${post.title}</h3>
        </div>
      </a>
    </article>
  `;
}

function renderPosts(posts, container) {
  if (!container) return;
  container.innerHTML = posts.map(createPostCard).join("");
}

if (blogContainer && typeof blogPosts !== "undefined") {
  renderPosts(blogPosts, blogContainer);

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedTag = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      if (selectedTag === "all") {
        renderPosts(blogPosts, blogContainer);
      } else {
        const filteredPosts = blogPosts.filter(post =>
          post.tags.includes(selectedTag)
        );
        renderPosts(filteredPosts, blogContainer);
      }
    });
  });
}

if (homeContainer && typeof blogPosts !== "undefined") {
  renderPosts(blogPosts.slice(0, 3), homeContainer);
}