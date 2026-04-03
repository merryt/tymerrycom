export const load = async ({ fetch }) => {
    console.log('Fetching /api/blog');
    const response = await fetch('/api/blog');
    const allPosts = await response.json();
    const workResponse = await fetch('/api/work');
    const caseStudies = await workResponse.json();
    console.log('Fetched posts length:', Array.isArray(allPosts) ? allPosts.length : 'NOT AN ARRAY');
    return {
        posts: allPosts,
        caseStudies
    };
};
