"use client";

import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog"; // PrimeReact Dialog
import dynamic from "next/dynamic"; // Dynamic import for Agora UIKit
const AgoraUIKit = dynamic(() => import("agora-react-uikit"), { ssr: false });
import { layout } from "agora-react-uikit"; // Import layout from Agora UIKit
import "agora-react-uikit/dist/index.css"; // Import Agora UIKit CSS

const VideoCallDialog: React.FC<{ isOpen: boolean; onHide: () => void }> = ({
  isOpen,
  onHide,
}) => {
  const [isHost, setHost] = useState(true); // Manages host/audience role
  const [isPinned, setPinned] = useState(false); // Toggles layout mode
  const [username, setUsername] = useState("guest"); // Manages the user's name
  const [isClient, setIsClient] = useState(false); // Ensures client-side rendering
  const [transcript, setTranscript] = useState(""); // To store live transcription
  const [isRecognitionActive, setRecognitionActive] = useState(false); // Manage recognition state

  const agoraAppId = "cd1f3f29ef86458a8fce0a2a3c5b192b"; // Your Agora App ID

  // Web Speech API for Transcription
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Your browser does not support SpeechRecognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true; // Keep listening continuously
    recognition.interimResults = true; // Allow partial results
    recognition.lang = "en-US"; // Set the language

    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0].transcript;
      setTranscript(transcript); // Update state with live transcription
    };

    recognition.onstart = () => {
      setRecognitionActive(true); // Set active when recognition starts
    };

    recognition.onend = () => {
      setRecognitionActive(false); // Set inactive when recognition ends
    };

    recognition.start(); // Start listening

    return () => recognition.stop(); // Cleanup on component unmount
  }, []);

  // Handle missing Agora App ID
  useEffect(() => {
    if (!agoraAppId && onError) {
      onError("Agora App ID is not defined in environment variables.");
    }
  }, [agoraAppId]);

  // Ensure component is only rendered client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    return null; // Avoid rendering server-side
  }

  // Custom CSS styles for the dialog and its content
  const dialogStyle: React.CSSProperties = {
    width: "100vw",
    zIndex: 1000,
  };

  const containerStyle: React.CSSProperties = {
    width: "auto",
    height: "100vh",
    display: "flex",
    flex: 1,
    backgroundColor: "#007bff22",
  };

  const videoContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#007bff",
    cursor: "pointer",
    borderRadius: 5,
    padding: "4px 8px",
    color: "#ffffff",
    fontSize: 20,
  };

  return (
    <Dialog
      header="Video Call"
      visible={isOpen}
      onHide={onHide}
      modal={true}
      style={dialogStyle}
      className="bg-opacity-100 bg-gray-50 rounded-lg shadow-2xl"
    >
      <div style={containerStyle}>
        <div style={videoContainerStyle}>
          <div style={navStyle}>
            <p style={{ fontSize: 20, width: 200 }}>
              You're {isHost ? "a host" : "an audience"}
            </p>
            <p style={buttonStyle} onClick={() => setHost(!isHost)}>
              Change Role
            </p>
            <p style={buttonStyle} onClick={() => setPinned(!isPinned)}>
              Change Layout
            </p>
          </div>
          {/* AgoraUIKit Video Call Integration */}
          {agoraAppId ? (
            <AgoraUIKit
              rtcProps={{
                appId: agoraAppId as string,
                channel: "test", // Replace with dynamic channel name if needed
                token: null, // Add token handling here
                role: isHost ? "host" : "audience",
                layout: isPinned ? layout.pin : layout.grid,
                enableScreensharing: true,
                video: true, // Ensure video is enabled
              }}
              rtmProps={{
                username: username || "user",
                displayUsername: true,
              }}
              callbacks={{
                EndCall: onHide,
              }}
            />
          ) : (
            <p className="text-red-600">Failed to load Agora components.</p>
          )}
        </div>
      </div>

      {/* Display live transcription */}
      <div style={{ marginTop: "20px" }}>
        <h3>Live Transcription</h3>
        <p>{transcript}</p>
        {isRecognitionActive ? (
          <p>Transcription is active</p>
        ) : (
          <p>Transcription is stopped</p>
        )}
      </div>
    </Dialog>
  );
};

export default VideoCallDialog;
