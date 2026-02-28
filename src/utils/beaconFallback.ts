if (!navigator.sendBeacon) {
  navigator.sendBeacon = (url: string, data?: BodyInit | null): boolean => {
    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify({ data })
    });
    return true;
  };
}
