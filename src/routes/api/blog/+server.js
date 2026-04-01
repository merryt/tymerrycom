import { json } from '@sveltejs/kit';

export const GET = async () => {
    try {
        console.log('API blog GET called');
        // Update glob to find +page.md in subdirectories
        const allPostFiles = import.meta.glob('../../blog/*/+page.md')
        const iterablePostFiles = Object.entries(allPostFiles)
        console.log(`Found ${iterablePostFiles.length} post files`);

        const allPosts = await Promise.all(
            iterablePostFiles.map(async ([path, resolver]) => {
                const { metadata } = await resolver()
                // path is like ../../blog/post-name/+page.md
                // we want the route to be /blog/post-name
                const parts = path.split('/');
                const postSlug = parts[parts.length - 2]; // the directory name
                const postPath = `/blog/${postSlug}`;

                return {
                    meta: metadata,
                    path: postPath
                }
            })
        )
        
        console.log('All posts resolved');

        const sortedPosts = allPosts.sort((a, b) => {
            const dateA = a.meta && a.meta.date ? new Date(a.meta.date) : new Date(0);
            const dateB = b.meta && b.meta.date ? new Date(b.meta.date) : new Date(0);
            return dateB - dateA;
        })

        console.log('Returning json response');
        return json(sortedPosts);
    } catch (err) {
        console.error('ERROR in API:', err);
        return new Response(err.message, { status: 500 });
    }
}
