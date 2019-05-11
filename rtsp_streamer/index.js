const Stream = require('./node-rtsp-stream');
const streamUrl = process.env.FRIDGECAM_STREAM_URL;
console.log("Listening to ", streamUrl);

stream = new Stream({
  name: 'fridgecam_stream',
  streamUrl: streamUrl,
  wsPort: 9999,
  width: 1280,
  height: 720
});
