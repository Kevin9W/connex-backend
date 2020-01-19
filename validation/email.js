module.exports = ({email}) => {
  let errors = [];
  if (!email) {
    errors.push({ message: 'Please enter your email' });
  }
  else if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
    errors.push({ message: 'Please enter a valid email' })
  }
  return {
    errors,
    notValid: Boolean(errors.length),
  }
}