const rpc = require("discord-rpc");
const client = new rpc.Client({ transport: "ipc" });
const util = require("util");
const path = require("path");

client.login({ clientId: "992893976417947799" }).catch(console.error);

const exec = util.promisify(require("child_process").exec);

async function start() {
  const proc = (await exec("")).stdout;

  let { stdout } = await exec(
    "lsof -p $(pgrep -f /System/Applications/Preview.app/Contents/MacOS/Preview) | grep pdf -i"
  );

  const file = stdout.split("\n")[0].split(" ").slice(42).join(" ");

  const name = path.basename(file);
  let activity = {
    details: name,
    timestamps: {
      start: Date.now(),
    },
    assets: {
      large_image: "icon",
      large_text: "huts",
    },
    buttons: [
      {
        label: "fjweiofjiea",
        url: "https://kaas.nl",
      },
    ],
  };

  client.on("ready", () =>
    client.request("SET_ACTIVITY", {
      pid: process.pid,
      activity,
    })
  );
}

start();
