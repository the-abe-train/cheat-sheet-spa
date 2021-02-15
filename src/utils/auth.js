import { stage, layer, tr, allArrows, allNodes } from './canvasSetup.js'

function displayLoggedIn(username) {
  document.querySelector('#show-username').innerHTML = username;
  document.querySelector('#show-user').style.display = 'flex';
  document.querySelector('#logout-btn').style.display = 'inline-block';
  document.querySelector('#save-btn').style.display = 'inline-block';
  document.querySelector('#load-btn').style.display = 'inline-block';
  document.querySelector('#login-btn').style.display = 'none';
  document.querySelector('#signup-btn').style.display = 'none';
}

function displayLoggedOut() {
  document.querySelector('#show-username').innerHTML = null;
  document.querySelector('#show-user').style.display = 'none';
  document.querySelector('#logout-btn').style.display = 'none';
  document.querySelector('#save-btn').style.display = 'none';
  document.querySelector('#load-btn').style.display = 'none';
  document.querySelector('#login-btn').style.display = 'flex';
  document.querySelector('#signup-btn').style.display = 'inline-block';
}

export function initUserbase() {
  displayLoggedOut();
  userbase.init({ appId: '6b91f467-e4bd-43a8-a519-28947a7dbcfb' })
    .then((session) => {
      if (session.user) {
        displayLoggedIn(session.user.username);
        loadCanvas();
      } else {
        displayLoggedOut()
      }
    })
    .catch(() => console.log("Could not find user database"))
}

export async function handleLogin(form) {

  const username = form.username.value;
  const password = form.password.value;
  return new Promise(async (res, rej) => {
    try {
      const user = await userbase.signIn({ username, password, rememberMe: 'local' });
      displayLoggedIn(user.username);
      loadCanvas();
      res();
    } catch (e) {
      res(e.message);
    }
  })
}


export async function handleSignup(form) {

  const username = form.username.value;
  const password = form.password.value;
  const confirmPassword = form['confirm-password'].value;

  return new Promise(async (res, rej) => {
    if (password !== confirmPassword) {
      res("Password and confirm password don't match.");

      return
    }
    try {
      const user = await userbase.signUp({ username, password, rememberMe: 'local' });
      displayLoggedIn(user.username);
      res();
    } catch (e) {
      res(e.message);
    }
  })
}

export function handleLogout() {
  userbase.signOut()
    .then(() => displayLoggedOut())
    .catch(() => console.log("Logout error"))
}

export async function loadCanvas() {

  // Remove existing groups from layer
  layer.draw();


  const databaseName = 'cheatsheet';
  const changeHandler = (items) => {
    if (items.length > 0) {
      // layer.destroyChildren();
      console.log(layer);
      const nodes = items.map(item => {
        return Konva.Node.create(item.item);
      });
      // items.forEach(item => layer.add(item.item))
      console.log(nodes);
      layer.add(...nodes);
    }
    layer.draw();
  }

  await userbase.openDatabase({ databaseName, changeHandler });
}

export async function saveCanvas() {
  const canvasJson = JSON.parse(stage.toJSON());
  console.log(canvasJson);
  canvasJson.children[0].children.forEach(async group => {
    const databaseName = 'cheatsheet';
    const item = group;
    const itemId = group.attrs.name;
    await userbase.insertItem({ databaseName, item, itemId })
      .then(console.log(`Inserted ${itemId}`))
      .catch(async e => {
        if (e.name === 'ItemAlreadyExists') {
          await userbase.updateItem({ databaseName, item, itemId })
            .then(console.log(`Updated ${itemId}`))
        }
      })
  })



}