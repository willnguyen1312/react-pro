// server.js
import http from "http";

http
  .createServer((req, res) => {
    if (req.url === "/events") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*", // Allow all origins
      });

      const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Send an initial message
      sendEvent({ message: "Hello, SSE!" });

      // Send a message every 5 seconds
      const intervalId = setInterval(() => {
        sendEvent({
          message: `Current time: ${new Date().toLocaleTimeString()}`,
        });
      }, 5000);

      // Clean up when the connection is closed
      req.on("close", () => {
        clearInterval(intervalId);
        res.end();
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
