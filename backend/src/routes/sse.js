import { Router } from "express";
const router = Router();

// Very simple Server-Sent Events endpoint for real-time updates demo
router.get("/stream", (req, res) => {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive"
  });
  res.flushHeaders();
  res.write(`event: ping\n`);
  res.write(`data: "connected"\n\n`);

  const timer = setInterval(() => {
    res.write(`event: heartbeat\n`);
    res.write(`data: ${Date.now()}\n\n`);
  }, 15000);

  req.on("close", () => clearInterval(timer));
});

export default router;
