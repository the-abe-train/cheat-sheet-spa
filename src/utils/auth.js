import { stage, layer } from './canvasSetup.js'

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
      loadCanvas(true);
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

export async function loadCanvas(newUser=false) {

  const databaseName = 'cheatsheet';
  let changeHandler;
  if (newUser) {
    changeHandler = async items => {
      console.log(items);
      const databaseName = 'cheatsheet';
      await userbase.insertItem({ databaseName, item: [], itemId: 'nodes' })
      await userbase.insertItem({ databaseName, item: [], itemId: 'arrows' })
      // await userbase.insertItem({ databaseName, item: [], itemId: 'tr'  })
      // layer.draw();
    }
  } else {
    changeHandler = (items) => {
      items.forEach(node => {
        const newNode = Konva.Node.create(node);
        layer.add(newNode)
      });
      layer.draw();
    }
  }

  await userbase.openDatabase({ databaseName, changeHandler });
}

export async function saveCanvas() {
  // const canvasJson = JSON.parse(stage.toJSON());
  const groups = ['tr', 'nodes', 'arrows'];

  const items = {
    tr: layer.children.filter(child => child.attrs.name === 'transformer')[0],
    nodes: layer.children.filter(child => child.attrs.name === 'nodes')[0],
    arrows: layer.children.filter(child => child.attrs.name === 'arrows')[0]
  }

  const nodes = layer.children.filter(child => {
    return child.attrs.name === 'nodes'
  })[0].children

  const nodesJsons = nodes.map(node => node.toJSON());

  console.log(nodesJsons);

  const databaseName = 'cheatsheet';
  const item = nodesJsons;
  const itemId = 'nodes';
  await userbase.updateItem({ databaseName, item, itemId })





  // canvasJson.children[0].children.forEach(async group => {
  //   const databaseName = 'cheatsheet';
  //   const item = group;
  //   console.log(item)
  //   const itemId = group.attrs.name;
  //   await userbase.insertItem({ databaseName, item, itemId })
  //     .then(console.log(`Inserted ${itemId}`))
  //     .catch(async e => {
  //       if (e.name === 'ItemAlreadyExists') {
  //         await userbase.updateItem({ databaseName, item, itemId })
  //           .then(console.log(`Updated ${itemId}`))
  //       }
  //     })
  // })



}
