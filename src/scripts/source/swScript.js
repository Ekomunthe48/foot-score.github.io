export default function Sw() {
  const appServerPublicKey = 'BHmbXjtJ69fkVrCS8EhWI9vMc79xrfTDwIyw9JWB7sf9eBv0gXhTe8Cdw6jtsXphspa0H27z5VIAbAco77f1hEY';
  const pushButton = document.querySelector('.js-push-btn');
  let isSubs = false;
  let swRegi = null;

  function urlB64ToUint8Array(base64String) {
    // eslint-disable-next-line no-mixed-operators
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      // eslint-disable-next-line no-useless-escape
      .replace(/\-/g, '+')
      .replace(/_/g, ' /');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function initUI() {
    pushButton.addEventListener('click', () => {
      pushButton.disabled = true;
      console.log(isSubs);
      if (isSubs) {
        // eslint-disable-next-line no-alert
        alert('You not subcribed yet');
        unsubsUser();
      } else {
        subsUser();
      }
    });

    swRegi.pushManager.getSubscription()
      .then((subscription) => {
        isSubs = !(subscription === null);
        if (isSubs) {
          console.log('User is Subscribed.');
        } else {
          console.log('User is NOT subscribed.');
        }
        updateBtn();
      });
  }

  function updateBtn() {
    if (Notification.permission === 'denied') {
      pushButton.textContent = 'Notifications is block.';
      // eslint-disable-next-line no-alert
      alert('You block the notifications');
      pushButton.disabled = true;
      return;
    }
    if (isSubs) {
      pushButton.textContent = 'off';
    } else {
      pushButton.textContent = 'on';
    }
    pushButton.disabled = false;
  }

  function subsUser() {
    const appServerKey = urlB64ToUint8Array(appServerPublicKey);
    swRegi.pushManager.subscribe({
      userVisibleOnly: true,
      appServerKey,
    })
      .then((subscription) => {
        console.log('User is subscribed:', subscription);
        const data = JSON.stringify(subscription);
        console.log(data);
        // eslint-disable-next-line no-const-assign
        isSubs = true;
        updateBtn();
      })
      .catch((err) => {
        console.log('Failed to subscribe the user: ', err);
        updateBtn();
      });
  }

  function unsubsUser() {
    swRegi.pushManager.getSubscription()
      // eslint-disable-next-line consistent-return
      .then((subscription) => {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch((error) => {
        console.log('Error unsubscribing', error);
      })
      .then(() => {
        console.log('User is unsubscribed.');
        isSubs = false;
        updateBtn();
      });
  }

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', () => {
      // eslint-disable-next-line no-unused-expressions
      navigator.serviceWorker;
      navigator.serviceWorker.register('/sw.js')
        .then((swReg) => {
          console.log('Pendaftaran ServiceWorker berhasil');
          swRegi = swReg;
          initUI();
        })
        .catch((error) => {
          console.log('Pendaftaran ServiceWorker gagal', error);
        });
    });
  } else {
    console.log('ServiceWorker belum didukung browser ini.');
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }
}
