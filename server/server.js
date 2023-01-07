const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo:WoTcSuia2Wg2TxcxDU8J@containers-us-west-97.railway.app:6205");
const Document = require("./Document");

const io = require("socket.io")(4000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket => {
  socket.on("get-document", async slug => {
    const document = await getDocument(slug);
    socket.join(slug);

    socket.emit("load-document", document.data);

    socket.on("send-changes", delta => {
      socket.broadcast.to(slug).emit("receive-changes", delta);
    });

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(slug, { data });
    });
  });

  console.log("user connected...");
});

async function getDocument(slug) {
  if (slug == null) return;
  const document = await Document.findById(slug);
  if (document) return document;
  return await Document.create({ _id: slug, data: "" });
}
