// posts.json.js
export const GET = async () => {
    const allPostFiles = import.meta.glob('../chess/*.md')
    const iterablePostFiles = Object.entries(allPostFiles)

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver()
            const postPath = path.slice(2, -3)

            return {
                meta: metadata,
                path: postPath
            }
        })
    )



    const sortedPosts = allPosts.sort((a, b) => {
        return new Date(b.meta.date) - new Date(a.meta.date)
    })


    return {
        status: 200,
        body: sortedPosts
    }
}