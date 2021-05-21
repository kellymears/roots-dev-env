Have you ever wanted to be able to run all of the main roots projects at once while not modifying the filesystem of any of them?

- Install the deps: `yarn`
- Then clone down all the repos: `yarn init`
- Build the containers: `docker compose up`

You should wind up with a tree like this:

```
├── acorn
├── bedrock
├── bud
├── dev
├── sage
├── support
└── ...
```

These projects are all symlinked.
