const Menu = require('electron').Menu;
const config = require('../app.config');
// import env from "env";

import { leftMenuTemplate } from "../menu/left_menu_template";
import { rightMenuTemplate } from "../menu/right_menu_template";
import { fileMenuTemplate } from "../menu/file_menu_template";
import { dictMenuTemplate } from "../menu/dict_menu_template";
import { bookMenuTemplate } from "../menu/book_menu_template";
import { aboutMenuTemplate } from "../menu/about_menu_template";
import { editMenuTemplate } from "../menu/edit_menu_template";
import { helpMenuTemplate } from "../menu/help_menu_template";
// import { devMenuTemplate } from "../menu/dev_menu_template";
// import { langMenuTemplate } from "../menu/lang_menu_template";
import { engMenuTemplate } from "../menu/lang_eng_menu_template";
import { deuMenuTemplate } from "../menu/lang_deu_menu_template";
import { rusMenuTemplate } from "../menu/lang_rus_menu_template";
import { zhoMenuTemplate } from "../menu/lang_zho_menu_template";
import { tibMenuTemplate } from "../menu/lang_tib_menu_template";
const log = console.log

// const menu = null;
// const platform = process.platform;

export function MenuFactory(lang) {
  // const menus = [leftMenuTemplate, rightMenuTemplate, fileMenuTemplate(), dictMenuTemplate(), aboutMenuTemplate(), helpMenuTemplate()];
  const menus = [fileMenuTemplate(), dictMenuTemplate(), aboutMenuTemplate(), helpMenuTemplate()];

  // if (env.name !== "production") {
  //   menus.push(devMenuTemplate);
  // }
  // menus.push(langMenuTemplate);

  switch(lang) {
  case 'eng':
    menus.push(engMenuTemplate);
    break
  case 'deu':
    menus.push(deuMenuTemplate);
    break
  case 'rus':
    menus.push(rusMenuTemplate);
    break
  case 'tib':
    menus.push(tibMenuTemplate);
    break
  case 'zho':
    menus.push(zhoMenuTemplate);
    break
  default:
    menus.push(engMenuTemplate);
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
}
