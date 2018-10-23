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

// utilModule.makeNotification = match => ('!' + match.teamAName + '-' + match.teamBName); // TODO

utilModule.beautifyHours = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
};

module.exports = utilModule;
