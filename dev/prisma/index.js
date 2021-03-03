const { prisma, before, after, replace } = require("./lib");

/**
 * Search and replace demo
 */
const search = "old-site.com";
const replace = "new-site.com";

(async () => {
  /**
   * Wordpress uses `0000-00-00 00:00:00` as a timestamp
   * for post drafts. This is not legit and causes prisma to panic.
   *
   * This fn runs a raw query on the db updating those posts to
   * `0001-01-01 01:01:01`. At the end of our script we'll reset this.
   */
  await before();

  /**
   * Get all published posts
   */
  const posts = await prisma.post.findMany({
    where: {
      status: "publish",
    },
    include: {
      author: true,
    },
  });

  /**
   * Got em!
   */
  console.log(posts);

  /**
   * Use the good old promise all / reducer strat
   * to grind through those posts and run the search-replace
   */
  Promise.all(
    posts.reduce(async (promise, post) => {
      await promise;

      return prisma.post.update({
        where: {
          ID: post.ID,
        },

        data: {
          post_content: post.post_content.replace(
            new RegExp(search, "g"),
            replace
          ),
        },
      });
    }, Promise.resolve)
  );

  /**
   * Reset our db patch.
   */
  await after();
})();
