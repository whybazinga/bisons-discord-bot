class Bison {
  constructor(options) {
    this.mooBasis = options.mooBasis;
    this.mooExtension = options.mooExtension;
    this.alternativeSound = options.alternativeSound || null;
    this.locale = options.locale;
  }

  get sound() {
    return (this.mooBasis && this.mooExtension) ? this.sayMoo() : this.alternativeSound;
  }

  sayMoo(count = 18) {
    return this.mooBasis + this.mooExtension.repeat(Math.floor((Math.random() * count) + 1));
  }
}

class RuBison extends Bison {
  constructor(additionalOptions) {
    const options = Object.create(additionalOptions);
    options.mooBasis = 'му';
    options.mooExtension = 'у';
    options.locale = 'ru';
    super(options);
  }
}

class EnBison extends Bison {
  constructor(additionalOptions) {
    const options = Object.create(additionalOptions);
    options.mooBasis = 'mo';
    options.mooExtension = 'o';
    options.locale = 'en';
    super(options);
  }
}

class MixedBison extends Bison {
  constructor(additionalOptions) {
    const options = Object.create(additionalOptions);
    options.mooBasis = null;
    options.mooExtension = null;
    options.alternativeSound = 'не буду мычать говорить научись и вообще что ты мне сделаешь я в другом городе';
    options.locale = 'mx';
    super(options);
  }
}

class localeBisonFactory {
  createBison(locale, options = {}) {
    switch (locale.toLowerCase()) {
      case 'ru':
        return new RuBison(options);
      case 'en':
        return new EnBison(options);
      default:
        return new MixedBison(options);
    }
  }
}

module.exports = localeBisonFactory;
