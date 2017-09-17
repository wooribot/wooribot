/*
  CONGRATULATIONS on creating your first Botpress bot!

  This is the programmatic entry point of your bot.
  Your bot's logic resides here.

  Here's the next steps for you:
  1. Read this file to understand how this simple bot works
  2. Read the `content.yml` file to understand how messages are sent
  3. Install a connector module (Facebook Messenger and/or Slack)
  4. Customize your bot!

  Happy bot building!

  The Botpress Team
  ----
  Getting Started (Youtube Video): https://www.youtube.com/watch?v=HTpUmDz9kRY
  Documentation: https://botpress.io/docs
  Our Slack Community: https://slack.botpress.io
*/

module.exports = function(bp) {
  bp.rivescript.setUtf8(true)

  bp.hear(/GET_STARTED|안녕|하이|방가|헬로|hi/i, (event, next) => {

    bp.db.kvs
      .get(`users/id/${event.user.id}`)
      .then(user => {
        var count = 0;
        if(user) {
          event.reply('#welcome')
          count = user.count + 1
        } else {
          event.reply('#welcome')
          count = 1;
        }

        bp.db.kvs
          .set(`users/id/${event.user.id}`, {
            platform: event.platform,
            user: event.user,
            text: event.text,
            count: count,
            last_updated: new Date()
          })
      })
  })

  bp.hear('breatharianism', (event, next) => {
    event.reply('#breatharianism')
  })

  bp.hear('breatharian', (event, next) => {
    event.reply('#breatharian')
  })

  bp.hear('menu', (event, next) => {
    event.reply('#menu')
  })

  bp.hear({
    type: /message|text/i,
    text: /운세/i
  }, (event, next) => {

    event.reply('#fortune', {
      // You can pass data to the UMM bloc!
      name: `${event.user.first_name}`
    })
  })

  bp.hear({
    type: /message|text/i,
    text: /바이|빠이|ㅂㅂ|안녕히|굳바이/i
  }, (event, next) => {

    event.reply('#goodbye', {
      // You can pass data to the UMM bloc!
      name: `${event.user.first_name}`
    })
  })
}
