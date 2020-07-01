#!/usr/bin/env ts-node-script
import path from'path';
import chalk from'chalk';
import { theme } from'../src/css/zero.theme';
import { processTheme } from'../src/utils/css/zeroThemeUtils';
import writeFile from'./utils/fs/writeFile';

// @ts-ignore
const TARGET_PATH = path.resolve(__dirname, '../src/css/zero.generated.scss');

const generatedNotice = `
/*******************/
/* ZERO THEME SCSS */
/*******************/

/**
 * This is a GENERATED file! DO NOT modify
 * contents or your work will be lost next
 * time the zero-theme is generated.
 */

/** NOTHING SHOULD BE MODIFIED/ADDED/REMOVED BELOW THIS LINE. **/
/** _________________________________________________________ **/

`;

function main() {
  try {
    const processedTheme = processTheme(theme, {
      primaryThemeKey: 'primary',
      colorTransitionTime: 100,
      sass: true,
    });

    writeFile(TARGET_PATH, generatedNotice + processedTheme.css);

    randomGoodbye();

    // @ts-ignore
    process.exit(0);
  } catch (err) {
    console.error(err);
    // @ts-ignore
    process.exit(1);
  }
}

function randomGoodbye() {
  const phrases = [
    "Stay classy 😎",
    "Live long and prosper 🖖",
    "Cheerio!",
    "Cheers!",
    "May the force be with you.",
    "Go forth and conquer",
    "You will do well.",
    "I drink... your milkshake!",
    "Here's looking at you, kid.",
  ];
  const i = Math.floor(Math.random() * phrases.length);
  console.log(chalk.yellow(phrases[i]));
}

main();
