import { useState } from "react";
import TheHeader from "./components/TheHeader"
import TheFooter from "./components/TheFooter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TheHeader/>
      <div id="content">
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
      <TheFooter/>
    </>
  );
}

export default App;
