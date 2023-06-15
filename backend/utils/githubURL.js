const githubURLToSlug = (url) => {
  const urlObj = new URL(url);

  return urlObj.pathname.replace(/\//, '');
};

const slugToGithubURL = (slug) => {
  const urlObj = new URL(`https://github.com/${slug}`);

  return urlObj.href;
};

module.exports = { githubURLToSlug, slugToGithubURL };
