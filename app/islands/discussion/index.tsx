import { useEffect, useState } from "hono/jsx";

export default function Discussion() {
  const [openApiKey, setOpenApiKey] = useState("");
  const [discussionTheme, setDiscussionTheme] = useState("");
  const [isDiscussing, setIsDiscussing] = useState(false);

  const onSubmit = async () => {
    if (isDiscussing) {
      setIsDiscussing(false);
    } else {
      setIsDiscussing(true);
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5173/ws");
    console.log(socket);
    socket.addEventListener("open", () => {
      console.log("WebSocket connected");
    });
    socket.send(
      JSON.stringify({
        cmd: "join",
      })
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <title>OpenAI API Key</title>
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          placeholder="OpenAI API Key"
          value={openApiKey}
          onInput={(event) => setOpenApiKey(event.data ?? "")}
        />
      </label>

      <label className="form-control">
        <div className="label">
          <span className="label-text">What to discuss?</span>
        </div>
        <input
          type="text"
          placeholder="Discussion theme"
          className="input input-bordered"
          value={discussionTheme}
          onInput={(event) => setDiscussionTheme(event.data ?? "")}
        />
      </label>
      <button className="btn btn-block" type="submit" onClick={onSubmit}>
        {isDiscussing ? (
          <>
            <span className="loading loading-spinner" />
            Discussing...
          </>
        ) : (
          "Start"
        )}
      </button>
    </div>
  );
}
