const { clearTimeout } = require('timers');

const rp = require('request-promise');
const cheerio = require('cheerio');

const util = require('./util');


const notifierController = (function () {
  const activeNotifier = {
    id: null,
    options: {
      TEAM_NAME: null, // 'Dark Bisons',
      GROUP_STAGE_LINK: null, // 'https://www.joindota.com/en/leagues/europe/971-season-14/group/90-groupstage/887-europe-3-1',
      CHECK_REFRESH_TIME: null,
      MATCHES_CASH: {},
    },
  };

  function jdNotifier(sendMatchNotification) {
    rp({
      uri: activeNotifier.options.GROUP_STAGE_LINK,
      headers: {
        'User-Agent': 'Request-Promise',
      },
      transform(body) {
        return cheerio.load(body);
      },
    })
      .then(($) => {
        const closestMatchHtml = $('.widget.widget-ticker table tbody tr')
          .filter(function () {
            return $(this).find('.col-3 > a > img')
              .attr('title').toLowerCase() === activeNotifier.options.TEAM_NAME.toLowerCase()
              || $(this).find('.col-text-right > a > img')
                .attr('title').toLowerCase() === activeNotifier.options.TEAM_NAME.toLowerCase();
          })
          .has('span')
          .first();
        const closestMatch = {};
        closestMatch.date = +closestMatchHtml.find('td.col-2 > a > span').attr('data-time');
        closestMatch.teamAName = closestMatchHtml.find('td.col-3 > a > img').attr('title');
        closestMatch.teamBName = closestMatchHtml.find('td.col-text-right > a > img').attr('title');
        closestMatch.link = closestMatchHtml.find('td.col-2 > a').attr('href');
        const timeRemaining = (closestMatch.date - (new Date().getTime() / 1000)) / 3600;
        if (timeRemaining <= 124) {
          if (activeNotifier.options.MATCHES_CASH[closestMatch.link]) {
            if (activeNotifier.options.MATCHES_CASH[closestMatch.link].date !== closestMatch.date) {
              activeNotifier.options.MATCHES_CASH[closestMatch.link].date = closestMatch.date;
              // sendMatchNotification(util.makeNotification(closestMatch, true)); // TODO
            }
          } else {
            if (Object.keys(activeNotifier.options.MATCHES_CASH).length >= 100) {
              activeNotifier.options.MATCHES_CASH = {};
            }
            activeNotifier.options.MATCHES_CASH[closestMatch.link] = closestMatch;
            // sendMatchNotification(util.makeNotification(closestMatch)); // TODO
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    activeNotifier.id = setTimeout(jdNotifier, activeNotifier.options.CHECK_REFRESH_TIME, sendMatchNotification);
  }

  return {
    start: (sendMsgFunction, teamName, groupStageLink, checkRefreshTime = 1000 * 60 * 60) => {
      activeNotifier.options = {
        TEAM_NAME: teamName,
        GROUP_STAGE_LINK: groupStageLink,
        CHECK_REFRESH_TIME: checkRefreshTime,
        MATCHES_CASH: {},
      };
      activeNotifier.id = jdNotifier(sendMsgFunction);
    },
    stop: () => {
      clearTimeout(activeNotifier.id);
      activeNotifier.id = null;
      activeNotifier.options = {
        TEAM_NAME: null,
        GROUP_STAGE_LINK: null,
        CHECK_REFRESH_TIME: null,
        MATCHES_CASH: {},
      };
    },
  };
}());

module.exports = notifierController;
