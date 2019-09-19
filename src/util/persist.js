const WebHDFS = require('webhdfs');
const config = require('../config');
const {Duplex} = require('stream');
const logger = require('./logger')(__filename);

const bufferToStream = data => {
  const stream = new Duplex();

  stream.push(data);
  stream.push(null);

  return stream;
};

const hdfsClient = WebHDFS.createClient({
  user: config.HDFS_USER,
  host: config.HDFS_HOST,
  port: config.HDFS_PORT,
  path: config.HDFS_PATH,
});

// Reader
const readFromFile = filePath =>
  new Promise((resolve, reject) => {
    const remoteReadStream = hdfsClient.createReadStream(filePath);

    remoteReadStream.on('error', err => {
      // Do something with the error
      logger.error(`Error event emitted: ${err}`);
      reject(err);
    });

    remoteReadStream.on('end', () => {
      // Upload is done
      logger.info(`read success.`);
      resolve(filePath);
    });
  });

// Writer
const writeToFile = (filePath, data) =>
  new Promise((resolve, reject) => {
    const localFileStream = bufferToStream(data);
    const remoteWriterStream = hdfsClient.createWriteStream(filePath);

    localFileStream.pipe(remoteWriterStream);

    remoteWriterStream.on('error', err => {
      // Do something with the error
      logger.error(`Error event emitted: ${err}`);
      reject(err);
    });

    remoteWriterStream.on('finish', () => {
      // Upload is done
      logger.info(`write success.`);
      resolve(filePath);
    });
  });

module.exports = {
  readFromFile,
  writeToFile,
};
