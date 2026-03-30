export const load = async ({ fetch }) => {
    console.log('Fetching /api/blog');
    const response = await fetch('/api/blog');
    const allPosts = await response.json();
    console.log('Fetched posts length:', Array.isArray(allPosts) ? allPosts.length : 'NOT AN ARRAY');
    return {
        posts: allPosts
    };
};
