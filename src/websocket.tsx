 
import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import configAPI from "./utils/configAPI";

export const ExtendedDataWebSocket = async (): Promise<WebSocket | null> => {
  try {
    // 1️⃣ Load config first
    const config = await configAPI.get();
    const SOCKET_URL = `${config.ws}:${config.socketport}`;
    const SERIALNO = config.serialNo;

    // 2️⃣ Create WebSocket
    const ws = new WebSocket(`${SOCKET_URL}/ws/extended-monitor/${SERIALNO}/`);
    // ws.onopen = () => console.log("Extended Data WebSocket connected");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return ws;
  } catch (error) {
    console.error("Error initializing Extended Data WebSocket:", error);
    return null;
  }
};

export const LogoutWebSocket = async() => {
 try {
    // 1️⃣ Load config first
    const config = await configAPI.get();
    const SOCKET_URL = `${config.ws}:${config.socketport}`;
    const SERIALNO = config.serialNo;

    // 2️⃣ Create WebSocket
    const ws = new WebSocket(`${SOCKET_URL}/ws/logout/${SERIALNO}/`);
    // ws.onopen = () => console.log("Logout connected");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return ws;
  } catch (error) {
    console.error("Error initializing Logout WebSocket:", error);
    return null;
  }
       

};


export const LoginWebSocket = async() => {
 try {
    // 1️⃣ Load config first
    const config = await configAPI.get();
    const SOCKET_URL = `${config.ws}:${config.socketport}`;
    const SERIALNO = config.serialNo;

    // 2️⃣ Create WebSocket
    const ws = new WebSocket(`${SOCKET_URL}/ws/login/${SERIALNO}/`);
    // ws.onopen = () => console.log("Login connected");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return ws;
  } catch (error) {
    console.error("Error initializing Login WebSocket:", error);
    return null;
  }
};



export const SelectTableWebSocket = async() => {
 try {
    // 1️⃣ Load config first
    const config = await configAPI.get();
    const SOCKET_URL = `${config.ws}:${config.socketport}`;
    const SERIALNO = config.serialNo;

    // 2️⃣ Create WebSocket
    const ws = new WebSocket(`${SOCKET_URL}/ws/select-table-que/${SERIALNO}/`);
    // ws.onopen = () => console.log("Login connected");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return ws;
  } catch (error) {
    console.error("Error initializing Login WebSocket:", error);
    return null;
  }
};



