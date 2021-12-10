const path = require("path");

const rootDir = path.join(__dirname, "..");
const rootConfigDir = path.join(rootDir, "config");
const hbsHelpersDir = path.join(rootConfigDir, "hbs-helpers");
const srcDir = path.join(rootDir, "src");
const assetsDir = path.join(srcDir, "assets");
const templatesDir = path.join(srcDir, "templates");
const scriptsDir = path.join(srcDir, "scripts");
const configDir = path.join(srcDir, "config");
const apiDir = path.join(srcDir, "api");
const dataDir = path.join(srcDir, "data");
const generatedWebPagesDir = path.join(rootDir, "generated-webpages");

module.exports = {
  hbsHelpersDir,
  srcDir,
  assetsDir,
  templatesDir,
  scriptsDir,
  utilsDir: path.join(scriptsDir, "utils"),
  entryDir: path.join(scriptsDir, "entry"),
  componentsDir: path.join(scriptsDir, "components"),
  uiComponentsDir: path.join(scriptsDir, "ui"),
  pagesDir: path.join(scriptsDir, "pages"),
  layoutsDir: path.join(scriptsDir, "layouts"),
  typesDir: path.join(scriptsDir, "types"),
  appsDir: path.join(scriptsDir, "apps"),
  distDir: path.join(__dirname, "..", "dist"),
  webpageDir: path.join(__dirname, "..", "src", "webpages"),
  configDir,
  apiDir,
  dataDir,
  generatedWebPagesDir,
}
