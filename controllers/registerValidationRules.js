const LIVR = require('livr');
const extraRules = require('livr-extra-rules');

const defaultRules = {
    ...extraRules
};

LIVR.Validator.registerDefaultRules(defaultRules);

module.exports = { LIVR };