import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDocStore } from "./store";

const DocData = () => {
  const { slug } = useParams();
  const title = useDocStore(state => state.title);
  const description = useDocStore(state => state.description);
  const docSlug = useDocStore(state => state.slug);

  const setSlug = useDocStore(state => state.setSlug);
  const setTitle = useDocStore(state => state.setTitle);
  const setDescription = useDocStore(state => state.setDescription);

  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);

  useEffect(() => {
    if (docSlug === "") setSlug(slug);
  }, [docSlug, slug, setSlug]);

  useEffect(() => {
    // Update record    
  }, [title, description, slug]);

  return (
    <div className="w-80 fixed left-8 top-8 bg-white p-4 shadow-sm">
      <input
        type="text"
        value={localTitle}
        onChange={e => setLocalTitle(e.target.value)}
        onBlur={() => {
          if (localTitle) setTitle(localTitle);
          else setLocalTitle(title);
        }}
        placeholder="Enter a name"
        className="focus:border-none focus:outline-none"
      />
      <hr className="mt-2 mb-4" />
      <textarea
        maxLength={120}
        value={localDescription}
        onChange={e => setLocalDescription(e.target.value)}
        onBlur={() => {
          if (localDescription) setDescription(localDescription);
          else setLocalDescription(description);
        }}
        placeholder="Add a short description"
        className="w-full p-2 min-h-[100px] focus:outline-none"
        style={{ resize: "none" }}
      />
    </div>
  );
};

export default DocData;
