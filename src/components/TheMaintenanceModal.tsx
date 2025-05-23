function TheMaintenanceModal() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-y-3 bg-slate-800 bg-opacity-75 text-white backdrop-blur-sm">
      <span className="text-xl font-semibold">
        YPSDB is temporarily unavailable
      </span>
      <span className="text-lg">
        We are undergoing maintenance, please try again shortly
      </span>
    </div>
  );
}

export default TheMaintenanceModal;
