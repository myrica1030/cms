# Mutoe CMS

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/mutoe-cms/cms-api/ci.yml?label=CMS%20API&style=flat-square)](https://github.com/mutoe-cms/cms-api/actions)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/mutoe-cms/cms-admin/ci.yml?label=CMS%20ADMIN&style=flat-square)](https://github.com/mutoe-cms/cms-admin/actions)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/mutoe-cms/cms-page-builder/ci.yml?label=CMS%20PAGE%20BUILDER&style=flat-square)](https://github.com/mutoe-cms/cms-page-builder/actions)

# Requirements

- Nodejs 14 or higher

# Bootstrap

```shell
git clone https://github.com/mutoe-cms/mutoe-cms.git
cd mutoe-cms
cp .env.example .env
docker-compose pull
docker-compose up --no-build
```

# Development

This action need you have full access for this project.

Recommended IDE is JetBrains IDEA or WebStorm

```shell
git clone https://github.com/mutoe-cms/mutoe-cms.git
cd mutoe-cms
git submodule init
git submodule update --recursive --remote
bash start.sh
docker-compose up
```

## Publish version (in every project)

Requirements:

1. Install `conventional-changelog-cli` globally first

   ```bash
   pnpm add -g conventional-changelog-cli
   ```

2. Update npm package version and tag git commit.
   (It will update CHANGLOG automatically)

   ```bash
   npm version patch
   ```

# Roadmap

- [ ] Add node minimal and latest version to CI.
