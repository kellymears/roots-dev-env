const execa = require("execa");
const { pathExists } = require("fs-extra");
const { join } = require("path");

const package = require("../package");

/**
 * Clone all repos
 */
const clone = async () => {
  await package.repos.reduce(async (previousPromise, [path, repo]) => {
    const child = await previousPromise;
    child?.stdout && console.info(child.stdout);
    child?.stderr && console.error(child.stderr);

    const target = join(process.cwd(), path);
    const exists = await pathExists(target);

    console.log(
      exists ? `${target} already exists. Skipping ${repo}.` : `Cloning ${repo}`
    );

    return exists
      ? Promise.resolve()
      : execa.command(`git clone ${repo} ${path}`);
  }, Promise.resolve());
};

module.exports = { clone };
