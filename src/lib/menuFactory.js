const Menu = require('electron').Menu;
const config = require('../configs/app.config');
import env from "env";

import { fileMenuTemplate } from "../menu/file_menu_template";
import { devMenuTemplate } from "../menu/dev_menu_template";
import { editMenuTemplate } from "../menu/edit_menu_template";
import { langMenuTemplate } from "../menu/lang_menu_template";
import { testMenuTemplate } from "../menu/test_menu_template";
const log = console.log

// const menu = null;
// const platform = process.platform;

export function MenuFactory(lang) {
  // log('menu FACTORY')
  const menus = [fileMenuTemplate(lang), editMenuTemplate, testMenuTemplate(lang)];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  menus.push(langMenuTemplate);
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
}
