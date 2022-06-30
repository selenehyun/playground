const fs = require("fs");
const logs = require("./logs.json");

const errorLogs = logs.reduce(
  (results, { client_idx: clientIdx, receive_json: receiveJson, date }) => {
    const errorLogs = JSON.parse(receiveJson).errorLogs;

    if (!errorLogs.length) {
      return results;
    }

    return [
      ...results,
      {
        "CCN DB ID": clientIdx,
        errorLogs: JSON.stringify(errorLogs),
        date,
      },
    ];
  },
  []
);

fs.writeFile("filtered-logs.json", JSON.stringify(errorLogs), (err) => {
  console.error(err);
});
