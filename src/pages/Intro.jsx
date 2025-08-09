import { useState, useEffect, useMemo } from "react";
import { useStore } from "../store";
import { generateRandomCode } from "../utils";

function Intro() {
  let [consentChecked, setConsentChecked] = useState(false);
  let participantCode = useMemo(generateRandomCode, []);
  let [condition, setCondition] = useState("");
  const storeParticipantInfo = useStore((state) => state.storeParticipantInfo);

  useEffect(() => {
    const fetchCondition = async () => {
      const response = await fetch(
        "https://chardet.org/time-until-threshold/getFewestCondition.php"
      );
      const data = await response.json();
      if (
        data.condition &&
        (data.condition === "control" || data.condition === "treatment")
      ) {
        setCondition(data.condition);
      } else {
        console.error("Failed to fetch condition");
        alert(
          "Failed to fetch condition. Please try again later or contact the researcher."
        );
      }
    };
    fetchCondition();
  }, []);

  return (
    <div className="centerBody">
      <div className="main-container">
        <div className="card">
          <h4 className="instruction-text">
            Please read the following information about my research project and
            sign the consent form to proceed.
          </h4>
          <h4 className="introTitle">Title of the project:</h4>
          <p className="introParagraph">Interactive Visualization on Climate Change</p>

          <h4 className="titleText">Participant Code:</h4>
          <p className="subText">{participantCode}</p>

          <h4 className="titleText">Principal Investigator: </h4>
          <p className="subText">
            Jihyun Park (
            <a href="mailto:jihyun.park@inria.fr">jihyun.park@inria.fr</a>)
          </p>

          <h4 className="titleText">Supervisors: </h4>
          <p className="subText">
            Florent Cabric (
            <a href="mailto:florent.cabric@inria.fr">florent.cabric@inria.fr</a>
            ), Vanessa Peña Araya (
            <a href="mailto:vanessa.pena-araya@inria.fr">
              vanessa.pena-araya@inria.fr
            </a>
            )
          </p>

          <h4 className="introTitle">Purpose of the research project:</h4>
          <p className="introParagraph">
            Our goal is to understand how interactive data visualizations can
            support public understanding and involvement in climate change
            issues. The results from this experiment will help inform the design
            of visualizations that more effectively raise awareness and
            encourage meaningful engagement.
          </p>

          <h4 className="introTitle">What is expected from you:</h4>
          <p className="introParagraph">
            After agreeing to the terms, you will begin the experiment. You will
            be seated at a computer with a screen and keyboard, and you will
            follow the instructions displayed on the screen. The tasks will
            include answering questionnaires, reading content, interacting with
            visualizations, and solving quizzes. Most activities will be
            completed on the computer; however, at certain points, the
            researcher may provide you with paper materials and a pen, which
            will require you to read or write by hand. The researcher will be
            present throughout the process, and you are welcome to ask questions
            at any time. Your responses during the study will be recorded.
          </p>

          <h4 className="introTitle">
            Your right to withdraw from the research at any time:
          </h4>
          <p className="introParagraph">
            Your participation in this research is voluntary, and you can stop
            at any time without providing any justification. Your decision to
            participate, refuse to participate, or stop participating will not
            result in any penalty or loss of benefits to which you are otherwise
            entitled.
          </p>

          <h4 className="introTitle">
            Your rights to confidentiality and privacy:
          </h4>
          <p className="introParagraph">
            The data obtained will be treated with the utmost confidentiality.
            Your identity will be masked using a random number (participant
            code), and no other information will reveal it. Only the principal
            investigator and supervisors will have access; you may request their
            destruction at any time by providing the participant code listed on
            the consent form.
          </p>

          <h4 className="introTitle">Benefits of the study:</h4>
          <p className="introParagraph">
            You may become more informed about the issue of climate change and
            its potential impacts.
          </p>

          <h4 className="introTitle">Possible risks of the study:</h4>
          <p className="introParagraph">
            While there are no anticipated physical risks, some participants may
            experience temporary feelings of anxiety or concern when engaging
            with information about climate change projections.
          </p>

          <h4 className="introTitle">Dissemination:</h4>
          <p className="introParagraph">
            The results of this research will be used for academic purposes,
            primarily for the completion of a master's thesis.
          </p>

          <h4 className="introTitle">Your right to ask questions:</h4>
          <p className="introParagraph">
            You may ask questions about the research at any time(before, during,
            and after your participation) by contacting the project's principal
            investigator(jihyun.park@inria.fr).
          </p>

          <h4 className="introTitle">Consent to paticipate:</h4>
          <p className="introParagraph">
            By ticking the checkbox and clicking the "Continue" button below,
            you certify that you have read and understood the information above,
            that the researcher has answered your questions satisfactorily, and
            that you have been advised that you are free to withdraw your
            consent or withdraw from this research at any time.
          </p>

          <label className="checkBox">
            I consent to participate in this research project:
            <input
              type="checkbox"
              name="consentCheckbox"
              onClick={() => {
                setConsentChecked(!consentChecked);
              }}
            />
          </label>

          <button
            className="userActionButton rightButton"
            disabled={!consentChecked || condition === ""}
            onClick={() => {
              storeParticipantInfo(participantCode, condition);
            }}
          >
            Continue
          </button>
          <div>
            <p>Debug only:</p>

            <button
              className="userActionButton rightButton"
              disabled={!consentChecked || condition === ""}
              onClick={() => {
                alert("Debug mode: Condition set to 'control'");
                storeParticipantInfo(participantCode, "control");
              }}
            >
              Continue with
              <br /> Control Condition
            </button>
            <button
              style={{ marginTop: "10px" }}
              className="userActionButton rightButton"
              disabled={!consentChecked || condition === ""}
              onClick={() => {
                alert("Debug mode: Condition set to 'treatment'");
                storeParticipantInfo(participantCode, "treatment");
              }}
            >
              Continue with
              <br /> Treatment Condition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
