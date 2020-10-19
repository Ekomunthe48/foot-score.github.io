export default function Sw() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // eslint-disable-next-line no-unused-expressions
      navigator.serviceWorker;
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => {
          console.log('Pendaftaran ServiceWorker berhasil');
        })
        .catch(() => {
          console.log('Pendaftaran ServiceWorker gagal');
        });
    });
  } else {
    console.log('ServiceWorker belum didukung browser ini.');
  }
}
