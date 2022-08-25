exports.getVersionInfo = () => {
  const { version: devCliVersion } = require(`../../package.json`);
  return `Oryx Dev CLI version: ${devCliVersion}`;
};
