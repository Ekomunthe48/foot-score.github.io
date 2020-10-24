const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BAcFk6lfsNhhIKqd22cEVpmZ3a9yi1rE-O79PQWEyNPKWzYBe6_ogC1go23Ki6vyYS51noU76juwRa9X84Qkgrs',
  privateKey: '1BclGAVXT00gy8bo6r6CGuzWYY0Rov_tvZMznBss58E',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/AAAAMDn9msk:APA91bFGAz0g7M6WTlGWAZfkXc7zLt1_pre-o2826fvW3-h0aA7CL0fRuqz_hd1d1IrR5Wfx9aMFGIcIxR6ZnTFHAecNynUMcXn_ySx-6FrQIPLfau9PzwP-2vm5ua9wUePuuD5G7VM',
  keys: {
    p256dh: 'BDgN5ihLSqvU7nC-rU22IDaKbUPTFbdT0rNQucvAftNUrSXM1P8a-wAmjK6z7rkx2TvE--ry1-P-zK_oksCgfHE ',
    auth: 'HjCDdeBSuYbhiCc_f-fMOcEzQgDpv7Ew-oOzk5NRwt0',
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
