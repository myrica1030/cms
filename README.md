# CMS

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/myrica1030/cms/build.yml?style=for-the-badge)](https://github.com/myrica1030/cms/actions/workflows/build.yml)
[![Codecov](https://img.shields.io/codecov/c/github/myrica1030/cms?style=for-the-badge)](https://app.codecov.io/gh/myrica1030/cms)

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/myrica1030/cms/test-api.yml?label=CMS%20API&style=flat-square)](https://github.com/myrica1030/cms/actions/workflows/test-api.yml)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/myrica1030/cms/test-admin.yml?label=CMS%20ADMIN&style=flat-square)](https://github.com/myrica1030/cms/actions/workflows/test-admin.yml)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/myrica1030/cms/test-page-builder.yml?label=CMS%20PAGE%20BUILDER&style=flat-square)](https://github.com/myrica1030/cms/actions/workflows/test-page-builder.yml)
<br>
[![Codecov](https://img.shields.io/codecov/c/github/myrica1030/cms?flag=api&style=flat-square&label=CMS%20API)](https://app.codecov.io/gh/myrica1030/cms?components%5B0%5D=cms-api)
[![Codecov](https://img.shields.io/codecov/c/github/myrica1030/cms?flag=admin&style=flat-square&label=CMS%20ADMIN)](https://app.codecov.io/gh/myrica1030/cms?components%5B0%5D=cms-admin)
[![Codecov](https://img.shields.io/codecov/c/github/myrica1030/cms?flag=page-builder&style=flat-square&label=CMS%20PAGE%20BUILDER)](https://app.codecov.io/gh/myrica1030/cms?components%5B0%5D=cms-page-builder)

# Requirements

- Node.js 20 or higher

# Development

Recommended IDE is JetBrains IDEA or WebStorm

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
