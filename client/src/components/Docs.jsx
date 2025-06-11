import Navbar from "./Navbar";

export default function Docs() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "bold" }}
        >
          Welcome to my AI Code Review Assistant
        </h2>
        <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
          This software makes code review seamless and easy.
        </p>

        <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
          These are steps to get you started:
        </p>
      </div>

      <div>
        <h3
          style={{ fontSize: "22px", marginBottom: "16px", fontWeight: "bold" }}
        >
          Basics of my UI
        </h3>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            Authentication: You can sign in using the app's built-in Signin
            feature. It uses JWT for stateless security management.
          </p>
          <img
            src="./signin-button-pointer.png"
            alt="Home page of app"
            height="500px"
            width="900px"
            style={{ marginTop: "10px", borderRadius: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            Code Review Reports: You can view all your previous reports here,
            but this works only if you are signed in. If you are not, you cannot
            save any of your code reviews but you will be able to test out the
            Code review process without persistent storage. This is done via
            Express API and MongoDB.
          </p>
          <img
            src="./reports-button-pointer.png"
            alt="Image showing directions for reports page"
            height="500px"
            width="900px"
            style={{ marginTop: "10px", borderRadius: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            Functionalities the App provides: I have tried to make the review
            process as close to a real IDE workflow as possible. You have a
            sidebar to add, delete, and select files. You also have an inbuilt
            VS-Code-like IDE to modify or add code. We also provide more utils
            such as selecting a language to get rich Intellisense and code
            completion.
          </p>
          <img
            src="./ide-features.png"
            alt="IDE Features"
            height="500px"
            width="900px"
            style={{ marginTop: "10px", borderRadius: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            I also provide a settings tab that will help you completely
            customize the way your IDE looks. You can change the font size,
            color theme, and tab spaces.
          </p>
          <img
            src="./settings-panel.png"
            alt="Settings panel"
            height="500px"
            width="900px"
            style={{ marginTop: "10px", borderRadius: "8px" }}
          />
        </div>
      </div>

      <div>
        <div style={{ marginBottom: "16px" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "bold" }}>
            Quick demo of using the app
          </h3>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "12px",
              lineHeight: "1.6",
            }}
          >
            Insert a code block into a cell, choose a language, and rename the
            file for your convenience. Make changes to the code as needed.
          </p>
          <img
            src="./adding-first-codeblock.png"
            alt="Adding first code block"
            height="500px"
            width="900px"
            style={{ marginTop: "10px", borderRadius: "8px" }}
          />
          <p
            style={{
              fontSize: "18px",
              marginBottom: "12px",
              lineHeight: "1.6",
            }}
          >
            You can add multiple code cells for the review at the same time.
            Here I have tried using a full-stack example. Added Go for the
            backend and React for the frontend.
          </p>
          <img
            src="./adding-multiple-codeblock.png"
            alt="Adding multiple code blocks"
            height="500px"
            width="900px"
            style={{ marginTop: "10px", borderRadius: "8px" }}
          />
          <p
            style={{
              fontSize: "18px",
              marginBottom: "12px",
              lineHeight: "1.6",
            }}
          >
            Click on "Start code review" button and wait for the LLM to finish
            the review.
          </p>
          <img
            src="./wait-for-review-process.png"
            alt="Waiting for review process"
            height="500px"
            width="900px"
            style={{ marginTop: "10px", borderRadius: "8px" }}
          />
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            You will be redirected to the report page. You can download the
            report as a PDF if you want.
          </p>
          <img
            src="./code-review-report.png"
            alt="Code review report"
            height="500px"
            width="900px"
            style={{
              marginTop: "10px",
              borderRadius: "8px",
              boxShadow: "0 12px 24px rgba(0,0,0,0.5)",
            }}
          />
          <img
            src="./downloaded-report.png"
            alt="Downloaded report"
            height="400px"
            width="900px"
            style={{ marginTop: "10px", borderRadius: "8px" }}
          />
        </div>
      </div>
    </div>
  );
}
