import { useState } from "react";
import { useDataStore } from "./store";
import {
  AddIcon,
  AddCircleIcon,
  CopyIcon,
  CheckIcon,
} from "@100mslive/react-icons";
import Modal from "./Modal";

const Home = () => {
  const userToken = useDataStore(state => state.userToken);
  const userName = useDataStore(state => state.userName);
  const documents = useDataStore(state => state.documents);
  const [copiedToken, setCopiedToken] = useState(false);

  return (
    <div className="p-8 bg-background-default min-h-screen">
      {userToken ? null : <Modal />}
      <>
        <p className="text-typo-highlight text-3xl font-semibold">
          Welcome {userName}!
        </p>
        <div className="mt-10">
          <p className="text-typo-highlight text-2xl w-max font-semibold mb-6">
            {documents.length
              ? "Start brainstorming!"
              : "Get started by creating a new document!"}
          </p>
          <div className="w-max">
            <div
              className="w-56 h-32 bg-white rounded-lg group opacity-20 hover:opacity-50 flex items-center justify-center hover:cursor-pointer"
              onClick={userToken => {
                window.open(
                  `${window.location.href}doc/${crypto.randomUUID()}`
                );
              }}
            >
              <AddIcon className="group-hover:hidden h-6 w-6" />
              <AddCircleIcon className="hidden group-hover:block h-12 w-12 transition-all" />
            </div>
            <p className="text-typo-subtle mt-2 text-center">
              Create a new document
            </p>
          </div>
        </div>

        {documents.length ? (
          <div className="mt-10 w-max">
            <p className="text-typo-highlight text-2xl w-max font-semibold mb-6">
              Shared documents:
            </p>
            <p className="text-typo-highlight text-2xl w-max font-semibold mb-6">
              Your documents:
            </p>
          </div>
        ) : null}
      </>
      {/* <div>
        <p className="text-typo-highlight text-2xl w-max font-semibold mt-6 mb-2">
          Sharing and receiving access:
        </p>
        <p className="text-typo-subtle font-medium">
          By default, only the creator of a particular document can access it.
          <br /> To share access with others, add their user tokens in the document page.
        </p>

        <p className="text-typo-highlight font-semibold text-lg mt-4 mb-2">
          Grab your user token:
        </p>
        {userToken ? (
          <span className="bg-secondary-dark py-1 px-2 font-mono w-max text-white rounded flex items-center gap-4">
            {userToken}
            <span
              className="cursor-pointer hover:bg-secondary-default bg-secondary-dark p-1 rounded"
              onClick={() => {
                setCopiedToken(true);
                setTimeout(() => setCopiedToken(false), 2000);
              }}
            >
              {copiedToken ? <CheckIcon /> : <CopyIcon />}
            </span>
          </span>
        ) : null}
      </div> */}
    </div>
  );
};

export default Home;
