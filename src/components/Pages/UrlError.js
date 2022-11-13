import React from "react";

function UrlError() {
  return (
    <>
      <h1 className="text-2xl ">Error in Url</h1>
      <h3>
        {
          "Please use the following format: http://<server_name_or_ip>:<port>/#<room>[<player_name>]"
        }
      </h3>
    </>
  );
}

export default UrlError;
