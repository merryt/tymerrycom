export const load = async ({ fetch }) => {
    const response = await fetch('/api/blog');
    const allPosts = await response.json();
    return {
        posts: allPosts
    };
};
