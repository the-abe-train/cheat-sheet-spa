function displayLoggedIn(username) {
  document.querySelector('#show-username').innerHTML = username;
  document.querySelector('#show-user').style.display = 'flex';
  document.querySelector('#logout-btn').style.display = 'inline-block';
  document.querySelector('#login-btn').style.display = 'none';
  document.querySelector('#signup-btn').style.display = 'none';
}

function displayLoggedOut() {
  document.querySelector('#show-username').innerHTML = null;
  document.querySelector('#show-user').style.display = 'none';
  document.querySelector('#logout-btn').style.display = 'none';
  document.querySelector('#login-btn').style.display = 'flex';
  document.querySelector('#signup-btn').style.display = 'inline-block';
}

export function initUserbase() {
  displayLoggedOut();
  userbase.init({ appId: '6b91f467-e4bd-43a8-a519-28947a7dbcfb' })
  .then((session) => {
    if (session.user)  {
      displayLoggedIn(session.user.username);
    } else {
      displayLoggedOut()
    }
  })
  .catch(() => console.log("Could not find user database"))
}

export function handleLogin(form) {
  const username = form.username.value
  const password = form.password.value
  userbase.signIn({ username, password, rememberMe: 'local' })
    .then((user) => displayLoggedIn(user.username))
    .catch((e) => form.password.setCustomValidity(e.toString()))
}

function handleSignUp(e) {
  e.preventDefault()

  const username = document.getElementById('signup-username').value
  const password = document.getElementById('signup-password').value

  userbase.signUp({ username, password, rememberMe: 'local' })
    .then((user) => showTodos(user.username))
    .catch((e) => document.getElementById('signup-error').innerHTML = e)
}

export function handleLogout() {
  userbase.signOut()
    .then(() => displayLoggedOut())
    .catch(() => console.log("Logout error"))
}