module.exports = ({ user_login, email, password, password2 }) => {
  let errors = [];
  if (!user_login) {
    errors.push({ message: 'Please enter your username' });
  }

  if (!email) {
    errors.push({ message: 'Please enter your email' });
  }
  else if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
      errors.push({message: 'Please enter a valid email'})
  }

  if (!password) {
    errors.push({ message: 'Please enter your password' });
  }
  else if (password.length<6){
    errors.push({ message: 'Password must be 6 characters long' });
  }

  if (password !== password2) {
    errors.push({ message: 'Your passwords do not match' });
  }

  return {
    errors,
    notValid: Boolean(errors.length),
  }
}
