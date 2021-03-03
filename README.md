Have you ever wanted to be able to run all of the main roots projects
at once while not modifying the filesystem of any of them?

- Install the deps: `yarn install`
- Then clone down all the repos: `node ./index`
- Kick off lando: `lando start`

You should wind up with a tree like this:

```
├── acorn
├── bedrock
├── bud
├── dev
├── sage
├── support
├── vendor
└── yarn.lock
```

Each of those directories is unmodified and they're all
mounted in the Lando container for easy living.

The dream:

```
  lando composer@acorn    Runs composer@acorn commands
  lando composer@bedrock  Runs composer@bedrock commands
  lando composer@sage     Runs composer@sage commands
```

THE DREAM:

```
  lando yarn@bud          Runs yarn@bud commands
  lando yarn@prisma       Runs yarn@prisma commands
  lando yarn@sage         Runs yarn@sage commands
```
