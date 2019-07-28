import { remote } from "electron";

const Menu = remote.Menu;
const MenuItem = remote.MenuItem;


document.onmousedown = mouseclick

/*
  меню - попроще
  форма:
  - персей
  текст:
  - local dict
  - merge local
  - local to csv


*/

const perseus = new MenuItem({
  label: "Perseus Greek Word Study Tool",
  click: () => {
    document.execCommand("copy");
  }
});

const wiktionary = new MenuItem({
  label: "Wiktionary",
  click: () => {
    document.execCommand("copy");
  }
});

const localDict = new MenuItem({
  label: "Local Dictionary for this text",
  click: () => {
    document.execCommand("copy");
  }
});

const megreLocalDict = new MenuItem({
  label: "Main Local Dictionary",
  click: () => {
    document.execCommand("copy");
  }
});

function mouseclick(ev) {
  if (ev.button != 2) return
  const normalMenu = new Menu();

  let el = ev.target
  if (el.classList.contains('active-form')) normalMenu.append(perseus), normalMenu.append(wiktionary) // log('context:', el.textContent)
  else log('context:', 'kuku')
  // log('_____RIGHT', el)

  normalMenu.append(localDict)
  normalMenu.append(megreLocalDict)

  let state = settings.get('state')

  ev.preventDefault()
  normalMenu.popup(remote.getCurrentWindow());
}
