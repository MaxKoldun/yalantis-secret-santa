const { LIVR } = require('../registerValidationRules.js');
const db = require('../../models');

class UsersGetSanta {
    static validationRules = {
        user_id : [ 'required', 'positive_integer' ]
    };

    async execute(req, res) {
        try {
            const { user_id } = req.params;
            const validator = new LIVR.Validator(UsersGetSanta.validationRules);
            validator.validate({ user_id });
            if (validator.getErrors()) {
                return res.status(422).send({ 
                    message: 'Input parameters are not valid', 
                    errors: validator.getErrors() 
                });
            }
    
            const user = await db.User.findByPk(user_id,
            {
                attributes: [],
                include: [ 
                    { 
                        model: db.User,
                        as: 'santaFor',
                        attributes: [ 'first', 'last' ],
                        include: [ { as: 'wishes', model: db.Wish, attributes: [ 'message' ] } ]
                    } 
                ]
            });
    
            if (!user) {
                return res.status(404).send({ message: 'User is not found' });
            }
        
            res.send(user);
        } catch(err) {
            console.log('***There was an error getting a santa', JSON.stringify(err));
    
            return res.send(err)
        }
    }
}

module.exports = new UsersGetSanta()