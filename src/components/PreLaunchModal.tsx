import { useState } from "react";

function PreLaunchModal() {
  const [showModal, setShowModal] = useState(
    import.meta.env.VITE_PRELAUNCH_CODE ? true : false,
  );

  const checkValue = (value: string) => {
    if (value === import.meta.env.VITE_PRELAUNCH_CODE) {
      setShowModal(false);
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center gap-2 bg-black text-whiteIce-50 ${showModal ? "" : "hidden"}`}
    >
      <span>Enter code</span>
      <input
        className="hover-blue rounded bg-boxBg px-3 py-1 text-black"
        onChange={(e) => {
          checkValue(e.target.value);
        }}
      />
    </div>
  );
}

export default PreLaunchModal;
