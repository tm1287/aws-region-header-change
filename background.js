chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ status: "Active" }, function () {
    console.log("The status is active");
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: "https://*.aws.amazon.com/*" },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    },
  ]);
});
