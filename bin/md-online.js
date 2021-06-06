#!/usr/bin/env node

const { runCommand, listenClose } = require('../utils/common')
const { resolve } = require('path')
const { v4: uuidv4 } = require('uuid');

var portfinder = require('portfinder'),
    argv       = require('minimist')(process.argv.slice(2));
		logger = {
			info: console.log
		}

var port = argv.p || argv.port || parseInt(process.env.PORT, 10),
		version = argv.v || argv.version,
		list = argv.l || argv.list || false,
		file = argv.f || argv.file || '',
		uuid = uuidv4()

process.title = 'md-online';

if (argv.h || argv.help) {
  console.log([
    'usage: md-online [path] [options]',
    '',
    'options:',
    '  -p --port    Port to use [8080]',
    '  -h --help          Print this list and exit.',
		'  -f --file          Open a markdown file.',
    '  -v --version       Print the version and exit.',
		'  -l --list       Generate with list.'
  ].join('\n'));
  process.exit();
}


if (version) {
  logger.info('v' + require('../package.json').version);
  process.exit();
}

const start = () => {
	let env = process.env
	env.currentdir = process.cwd()
	console.log('portportportport', port)
	env.port = port
	env.list = list
	env.uuid = uuid
	env.file = file
	runCommand("npm", ["start"], {
		cwd: __dirname,
		env: env
	})
}

if (!port) {
  portfinder.basePort = 8080;
  portfinder.getPort(function (err, sport) {
    if (err) { throw err; }
    port = sport
		start()
  });
} else {
	start()
}

listenClose().then(() => {
	const temp = resolve(__dirname, '../temp/', `${process.cwd().split('/').slice(-1)[0]}`)
	runCommand("rm", ["-rf", temp])
	runCommand("rm", ["-f", resolve(__dirname, `../${uuid}.json`)])
	process.exit()
})


