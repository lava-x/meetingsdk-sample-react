import React from "react";

import "./App.css";

declare var ZoomMtg;

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.0.1/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function App() {
  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  const signatureEndpoint = "https://generate-meeting-sign-lavax.herokuapp.com";
  const apiKey = "RmYD3DaSR3SfZH10RyqQKA";
  const meetingNumber = "92176777024";
  const role = 0;
  const leaveUrl = "https://www.google.com/"; // *Important: redirectUrl once exit zomm
  const userName = "React";
  const userEmail = "";
  const passWord = "";
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/meetings/join#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/webinars/join#join-registered-webinar
  const registrantToken = "";

  function getSignature(e) {
    e.preventDefault();
    console.log("test", e);

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
        console.log("line 48", response);
        startMeeting(response?.signature);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log("line 77", error);
          },
        });
      },
      error: (error) => {
        console.log("line 82", error);
      },
    });
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;