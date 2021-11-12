import React from "react";
import "./App.css";

// *Note this was origninally App-New.js

declare var ZoomMtgEmbedded;

function App() {
  const client = ZoomMtgEmbedded.createClient();

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  const signatureEndpoint = "https://generate-meeting-sign-lavax.herokuapp.com";
  const apiKey = "RmYD3DaSR3SfZH10RyqQKA";
  const meetingNumber = "92176777024";
  const role = 0;
  const userName = "Lavax tester";
  const userEmail = "";
  const passWord = "";
  
  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("line 34", response);
        console.log("line 35", response?.signature);
        startMeeting(response?.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const startMeeting = (signature) => {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        meetingInfo: [
          "topic",
          "host",
          "mn",
          "pwd",
          "telPwd",
          "invite",
          "participant",
          "dc",
          "enctype",
        ],
        toolbar: {
          buttons: [
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {
                console.log("custom button");
              },
            },
          ],
        },
      },
    });

    client.join({
      apiKey: apiKey,
      signature: signature,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
    });
  };

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;