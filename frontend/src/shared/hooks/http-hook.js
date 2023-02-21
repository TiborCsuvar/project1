import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(async (url, method = "GET", headers = {}, body = null) => {
    setIsLoading(true);
    const httpAbortController = new AbortController();
    activeHttpRequest.current.push(httpAbortController);

    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
        signal: httpAbortController.signal
      });
      const responseData = await response.json();

      activeHttpRequest.current = activeHttpRequest.current.filter(reqCtrl => reqCtrl !== httpAbortController);

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      return responseData;

    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }

  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
    clearError: clearError
  };
};