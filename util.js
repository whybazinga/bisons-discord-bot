const utilModule = {};

utilModule.checkLocale = (content) => {
  const check = content.toLowerCase();
  let locale = 'init';
  if (check.includes('bison') || check.includes('moo')) {
    locale = 'en';
  }
  if (check.includes('бизон') || check.includes('муу')) {
    locale = 'ru';
  }
  if ((check.includes('бизон') || (check.includes('муу')))
    && (check.includes('bison') || check.includes('moo'))) {
    locale = 'mx';
  }
  return locale;
};

module.exports = utilModule;
