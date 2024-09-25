import { useState } from "react";

function PreLaunchModal() {
  const [showModal, setShowModal] = useState(import.meta.env.VITE_PRELAUNCH_CODE ? true : false);

  const checkValue = (value: string) => {
    if (value === import.meta.env.VITE_PRELAUNCH_CODE) {
      setShowModal(false);
    }
  }

  return (
    <div className={`fixed bg-black left-0 right-0 top-0 bottom-0 z-50 text-whiteIce-50 flex flex-col items-center justify-center gap-2 ${showModal ? '' : 'hidden'}`}>
      <span>Enter code</span>
      <input className="bg-boxBg text-black px-3 py-1 rounded hover-blue" onChange={(e) => {checkValue(e.target.value)}} />
    </div>
  );
}

export default PreLaunchModal;
