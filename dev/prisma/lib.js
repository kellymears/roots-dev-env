const {PrismaClient} = require('@prisma/client')

export const prisma = new PrismaClient({
  errorFormat: 'pretty',
})

/**
 * Wordpress uses `0000-00-00 00:00:00` as a timestamp
 * for post drafts. This is not legit and causes prisma to panic.
 *
 * This fn runs a raw query on the db updating those posts to
 * `0001-01-01 01:01:01`. At the end of our script we'll reset this.
 */
export const before = async () => {
  try {
    await prisma.$executeRaw(
      'UPDATE wp_posts SET post_modified_gmt = "0001-01-01 01:01:01" WHERE post_modified_gmt = "0000-00-00 00:00:00";',
    )

    await prisma.$executeRaw(
      'UPDATE wp_posts SET post_date_gmt = "0001-01-01 01:01:01" WHERE post_date_gmt = "0000-00-00 00:00:00";',
    )

    return true
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

/**
 * This cleans up the before fn.
 */
export const after = async () => {
  try {
    await prisma.$executeRaw(
      'UPDATE wp_posts SET post_modified_gmt = "0000-00-00 00:00:00" WHERE post_modified_gmt = "0001-01-01 01:01:01";',
    )
    await prisma.$executeRaw(
      'UPDATE wp_posts SET post_date_gmt = "0000-00-00 00:00:00" WHERE post_date_gmt = "0001-01-01 01:01:01";',
    )

    return true
  } catch (err) {
    console.error(err)

    process.exit(1)
  }
}

export const replace = async (search, replace) => {
  const posts = await allPosts()

  const transform = async (search, replace) =>
    Promise.all(
      posts.map(({ID, post_content}) =>
        prisma.post.update({
          where: {ID},
          data: {
            post_content: post_content.replace(
              new RegExp(search, 'g'),
              replace,
            ),
          },
        }),
      ),
    )

  return await transform(search, replace)
}
