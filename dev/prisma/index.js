const {prisma, before, after} = require('./lib')

const SEARCH = 'old-site.com'
const REPLACE = 'new-site.com'

;(async () => {
  await before()

  /**
   * Get all published posts
   */
  const posts = await prisma.post.findMany({
    where: {
      status: 'publish',
    },
    include: {
      author: true,
    },
  })

  /**
   * Use the good old promise all / reducer strat
   * to grind through posts and run replacements
   */
  Promise.all(
    posts.reduce(
      async (promise, {ID, post_content}) => {
        await promise

        return prisma.post.update({
          where: {ID},
          data: {
            post_content: post_content.replace(
              new RegExp(SEARCH, 'g'),
              REPLACE,
            ),
          },
        })
      },
      Promise(() => true),
    ),
  )

  await after()
})()
