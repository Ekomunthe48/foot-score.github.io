const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BGskf64ORP1oZC9MRVEjnZa1ExXn-MG9-4TerpLDwyeGm3KEKny0g-7Yp6j1rkES64qlOCxm8X9EoF2dgKgL7Bs',
  privateKey: 'cGdzZjDt09m-fc99Q3hy-EOqDtZS2SySwitx9ohKPQs',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/AAAAMDn9msk:APA91bEGSMoUkxprI06lEAKNGczuw8zoq_BTnE6OII96mZAMHFJizPtA9h0qQOnVHpWziBRbLrsr9Ki8hwDRtm_1RXGoMul-eN91YTRKjCNXKpobkKZyZStRiXBKilQkg5-skACjGMnA',
  keys: {
    p256dh: 'BI4JkM3zP-NJC4SvbSP4WrBxZ-qE8gpR43Y5dS57w5urdPGR43cSUuef6nTn2PrihEWcxTFxCBDCrqJPy7bw-I0',
    auth: 'glKVDwAX0fTsxZvSvTqqkwXz2JagUqS0CI9FkNKoKbI',
  },
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
const options = {
  gcmAPIKey: '207131351753',
  TTL: 60,
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options,
);
