function checkApiKey(apiKey) {
  const apiKeyStatus = document.getElementById("apiKeyStatus");

  if (!apiKey) {
    apiKeyStatus.textContent = "openai api-key is required";
    return;
  }

  fetch("https://api.openai.com/v1/models", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        apiKeyStatus.textContent = "✅";
      } else {
        apiKeyStatus.textContent = "❌ openai api-key is not correct";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      apiKeyStatus.textContent = "❌";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(
    ["model", "debugMode", "server", "apiKey", "language", "fontSize"],
    (data) => {
      document.getElementById("model").value = data.model || "caption";
      document.getElementById("server").value =
        data.server || "http://223.194.20.119:9919";
      document.getElementById("debugMode").checked = data.debugMode || false;
      document.getElementById("apiKey").value = data.apiKey || "";
      document.getElementById("language").value = data.language || "English";
      document.getElementById("fontSize").value = data.fontSize || "12px";

      checkApiKey(data.apiKey);
    }
  );
});

document.getElementById("save").addEventListener("click", function () {
  const model = document.getElementById("model").value;
  const server = document.getElementById("server").value;
  const debugMode = document.getElementById("debugMode").checked;
  const apiKey = document.getElementById("apiKey").value;
  const language = document.getElementById("language").value;
  const fontSize = document.getElementById("fontSize").value;

  chrome.storage.sync.set(
    { model, server, debugMode, apiKey, language, fontSize },
    function () {
      console.log(
        "Model, Server, Debug Mode, API Key, Language, and Font Size settings saved"
      );

      const saveMessage = document.getElementById("saveMessage");
      saveMessage.style.display = "block";

      setTimeout(() => {
        saveMessage.style.display = "none";
      }, 2000);

      checkApiKey(apiKey);
    }
  );
});
