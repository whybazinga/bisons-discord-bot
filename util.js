module.exports = (function () {
  function getState(state = false, lang = null) {
    return {
      state,
      lang,
    };
  }

  const checkContentMoo = (content) => {
    const check = content.toLowerCase();
    if ((check.includes('бизон') || (check.includes('муу')))
    && (check.includes('bison') || check.includes('moo'))) {
      return getState(true, 'mixed');
    }
    if (check.includes('bison') || check.includes('moo')) {
      return getState(true, 'en');
    }
    if (check.includes('бизон') || check.includes('муу')) {
      return getState(true, 'ru');
    }
    return getState();
  };

  const getMoo = (m, o, count = 18) => m + (o + o).repeat(Math.floor(Math.random() * count + 1));

  return {
    checkContentMoo,
    getMoo,
  };
}());
