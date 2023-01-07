import create from "zustand";

export const useDataStore = create(set => ({
  userName: "",
  userToken: "",
  setUserToken: token => set(() => ({ userToken: token })),
  setUserName: value => set(() => ({ userName: value })),
  documents: [],
  updateDocuments: doc =>
    set(state => ({ documents: [...new Set(...state.documents, doc)] })),
}));

// Documents store {id: UUID, title: "", description: "", access: ["", ""]}
