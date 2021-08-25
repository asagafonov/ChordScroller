const usePort = (options, responseHandler, disconnectHandler) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const port = chrome.tabs.connect(tabs[0].id);
    port.postMessage(options);
    port.onMessage.addListener(responseHandler);
    port.onDisconnect.addListener(disconnectHandler);
  });
};

export default usePort;
