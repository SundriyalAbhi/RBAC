const emailExistence = require('advanced-email-existence');

exports.checkEmail = async (req, res) => {
  const { email } = req.body;

  emailExistence.check(email, (err, response) => {
    if (err) {
      return res.status(500).send({ msg: 'Error checking email.' });
    }

    if (!response) {
      return res.status(400).send({ msg: 'Email is invalid or does not exist.' });
    }

    return res.status(200).send({ msg: 'Email is valid and active.' });
  });
};
