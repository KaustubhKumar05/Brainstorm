import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const SAVE_INTERVAL_MS = 2000;
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
  const wrapperRef = useRef();
  useEffect(() => {
    const editorContainer = document.createElement("div");
    const refCopy = wrapperRef.current;
    refCopy.append(editorContainer);
    new Quill(editorContainer, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    return () => (refCopy.innerHTML = "");
  }, []);

  return <div ref={wrapperRef} />;
};

export default TextEditor;
