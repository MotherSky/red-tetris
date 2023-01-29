import React from "react";

function UrlError({ title, message }) {
  return (
    <>
      <div className="font-pixel uppercase flex flex-col justify-center h-screen text-center">
        <h1 className="text-5xl text-rose-600 mb-8">
          {title || "Error in Url"}
        </h1>
        <p className="text-2xl">
          {message ||
            "Please use the following format: http://<server_name_or_ip>:<port>/#<room>[<player_name>]"}
        </p>
      </div>
    </>
  );
}

export default UrlError;
