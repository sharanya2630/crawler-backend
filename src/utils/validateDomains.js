const validateDomains = (domains) => {
  return domains.filter((domain) => domain.startsWith('http://') || domain.startsWith('https://'));
};

module.exports = validateDomains;
