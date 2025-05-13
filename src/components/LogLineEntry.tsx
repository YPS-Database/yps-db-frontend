import { DateTime } from "luxon";
import { LogLine } from "../types";

function LogLineEntry({ ts, level, event, message, data }: LogLine) {
  const parsedTs = DateTime.fromISO(ts);

  return (
    <div className="log-entry flex flex-col gap-1 rounded-lg bg-boxBg px-8 py-3.5">
      <div className="flex items-center gap-2">
        <div title={ts}>{parsedTs.toRelative()}</div>
        <div className="rounded-sm bg-slate-400 px-1 py-0.5 text-sm">
          {level}
        </div>
        <div className="font-bold">{event}</div>
      </div>
      <div>{message}</div>
      <div className="max-h-24 overflow-y-scroll rounded bg-slate-200 p-3">
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default LogLineEntry;
