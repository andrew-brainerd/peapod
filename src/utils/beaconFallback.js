if (!navigator.sendBeacon) {
  navigator.sendBeacon = (url, data) =>
    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify({ data })
    });
}
