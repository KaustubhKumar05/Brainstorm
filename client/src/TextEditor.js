import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = () => {
  const { slug } = useParams();
  const wrapperRef = useRef();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  // Loads editor
  useEffect(() => {
    const editorContainer = document.createElement("div");
    const refCopy = wrapperRef.current;
    refCopy.append(editorContainer);
    const quillInstance = new Quill(editorContainer, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    quillInstance.disable();
    quillInstance.setText("Loading page...");
    setQuill(quillInstance);
    return () => (refCopy.innerHTML = "");
  }, []);

  useEffect(() => {
    if (quill == null || socket == null) return;

    socket.once("load-document", document => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", slug);
  }, [socket, quill, slug]);

  useEffect(() => {
    const socketRef = io("http://localhost:4000");
    setSocket(socketRef);

    return () => socketRef.disconnect();
  }, []);

  // Send changes to server
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => quill.off("text-change", handler);
  }, [quill, socket]);

  // Get changes from server
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = delta => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => socket.off("receive-changes", handler);
  }, [quill, socket]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const saveInterval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => clearInterval(saveInterval);
  }, [socket, quill]);

  return (
    <div className="m-2 flex justify-center relative">
      <div className="w-80 fixed left-8 top-8 bg-white p-4 shadow-sm">
        <input
          type="text"
          value="Click to edit title"
          placeholder="Enter a name"
          className="focus:border-none focus:outline-none"
        />
        <hr className="mt-2 mb-4" />
        <textarea
          maxLength={120}
          placeholder="Add a short description"
          className="w-full p-2 min-h-[100px] focus:outline-none"
          style={{ resize: "none" }}
        />
      </div>
      <div ref={wrapperRef} className="max-w-[850px] self-center" />
    </div>
  );
};

export default TextEditor;
