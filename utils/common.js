const runCommand = (command, args, others) => {
	const cp = require("child_process");
	return new Promise((resolve, reject) => {
    let opt = {
			stdio: "inherit",
			shell: true
		}
    if (others) opt = Object.assign(opt, others)
    
		const executedCommand = cp.spawn(command, args, opt);

    executedCommand.stdout && executedCommand.stdout.on('data', (data) => {
      resolve(data.toString());
    });

		executedCommand.on("error", error => {
			reject(error);
		});

		executedCommand.on("exit", code => {
			if (code === 0) {
				resolve();
			} else {
				reject();
			}
		});
	});
};

const listenClose = () => {
  return new Promise((resolve, reject) => {
    if (process.platform === "win32") {
      var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
      });
    
      rl.on("SIGINT", function () {
        process.emit("SIGINT");
      });
    }
    
    process.on("SIGINT", function () {
      //graceful shutdown
      resolve()
    });
  })
}

module.exports = {
  runCommand,
  listenClose
}