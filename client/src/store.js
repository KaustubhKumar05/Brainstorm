import create from "zustand";

export const useDataStore = create(set => ({
  userName: localStorage.getItem("brainStormUserName") || "",
  userToken: localStorage.getItem("brainStormUserToken") || "",
  setUserToken: token => set(() => ({ userToken: token })),
  setUserName: value => set(() => ({ userName: value })),
  documents: [],
  updateDocuments: doc =>
    set(state => ({ documents: [...new Set(...state.documents, doc)] })),
}));
// Documents store {id: UUID, title: "", description: "", content: {}}

export const useDocStore = create(set => ({
  slug: "",
  title: "Click to edit title",
  description: "",
  content: "",
  setSlug: docSlug => set(() => ({slug: docSlug})),
  setTitle: text => set(() => ({ title: text })),
  setDescription: text => set(() => ({ description: text })),
}));
// Main DB: users: [objects for created docs]
