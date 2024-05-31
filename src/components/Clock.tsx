"use client";

import React, { useState, useEffect } from "react";

const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isClient]);

  const getFormattedTime = (date: Date) =>
    date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  if (!isClient) {
    // Render just a placeholder on the server
    return "00:00";
  }

  return getFormattedTime(time);
};

export default LiveClock;
