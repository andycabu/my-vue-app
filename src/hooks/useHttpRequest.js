import axios from "../api/axios";
import { useState } from "react";

export function useHttpRequest() {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const sendRequest = async (method, url, requestData) => {
    try {
      const res = await axios({ method, url, data: requestData });
      console.log(res);

      if (res.status === 200) {
        setStatus(res.status);
      }

      if (method === "DELETE") {
        return;
      } else {
        setResponse(res.data);
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return { sendRequest, response, error, status };
}
