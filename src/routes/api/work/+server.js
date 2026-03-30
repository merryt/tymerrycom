import { json } from '@sveltejs/kit';

export const GET = async () => {
    try {
        const allPostFiles = import.meta.glob('../../work/*/+page.md')
        const iterablePostFiles = Object.entries(allPostFiles)

        const allPosts = await Promise.all(
            iterablePostFiles.map(async ([path, resolver]) => {
                const { metadata } = await resolver()
                const parts = path.split('/');
                const postSlug = parts[parts.length - 2];
                const postPath = `/work/${postSlug}`;

                return {
                    meta: metadata,
                    path: postPath
                }
            })
        )

        return json(allPosts);
    } catch (err) {
        return new Response(err.message, { status: 500 });
    }
}
