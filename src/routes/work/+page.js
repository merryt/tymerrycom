export const load = async ({ fetch }) => {
    const posts = await fetch('/api/work');
    const allPosts = await posts.json();
    return {
        posts: allPosts
    };
};
