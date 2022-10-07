# PR SIZER

Github action in charge of labeling with t-shirt sizing the PRs based on the number of lines modified (added, updated and deleted)

# Description

This Gitnhub action uses the library [actions-toolkit](https://www.npmjs.com/package/actions-toolkit) in order to access to the GitHub methods such as the PR size or the labels of the repo.

# Usage

Inside the directory `.github/workflows`, create a file named `pr-sizer.yml` with the following content:

```
name: 'PR Sizer'
on: pull_request
jobs:
  pr-labeler:
    runs-on: ubuntu-latest
    name: Size PRs with labels
    steps:
      - uses: actions/checkout@v1
        with:
          s_max_size: '40'
          m_max_size: '200'
          l_max_size: '600'
          xl_max_size: '1000'
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

# License

ISC