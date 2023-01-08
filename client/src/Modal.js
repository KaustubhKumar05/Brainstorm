import { useDataStore } from "./store";
import {
  FilesIcon,
  EditIcon,
  MicOnIcon,
  ArrowRightIcon,
} from "@100mslive/react-icons";
import { useState } from "react";

const points = [
  { icon: <FilesIcon />, text: "Create and share rich text documents" },
  {
    icon: <EditIcon />,
    text: "Edit and collaborate with friends in real-time",
  },
  { icon: <MicOnIcon />, text: "Built in voice chat for interaction" },
];

const Modal = () => {
  const [userInput, setUserInput] = useState("");
  const setUserName = useDataStore(state => state.setUserName);
  const setUserToken = useDataStore(state => state.setUserToken);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur z-20">
      <div className="bg-secondary-dark rounded p-6">
        <p className="text-typo-highlight text-3xl font-bold mb-6">
          Welcome to BrainStorm!
        </p>
        <div>
          <div className="mt-3 mb-5 text-typo-highlight flex flex-col gap-2 pl-2">
            {points.map(point => (
              <div className="flex gap-1" key={point.text}>
                {point.icon} <p className="font-medium">{point.text}</p>
              </div>
            ))}
          </div>
          <p className="text-typo-highlight text-xl font-bold">
            Enter your name to get started:
          </p>
          <div className="flex mt-4 items-center justify-between gap-3">
            <input
              className="border-bord-light bg-secondary-dark border-2 rounded text-base p-1.5 focus:border-typo-highlight focus:outline-none text-typo-subtle w-full"
              placeholder="Set user name"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
            />
            <button
              className="bg-typo-highlight hover:bg-white disabled:bg-typo-subtle rounded-full p-1.5 flex items-center justify-center"
              disabled={!userInput}
              onClick={() => {
                const token = crypto.randomUUID();
                setUserName(userInput);
                setUserToken(token);
                localStorage.setItem("brainStormUserName", userInput);
                localStorage.setItem("brainStormUserToken", token);
              }}
            >
              <ArrowRightIcon className="text-secondary-dark" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
