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
            A study on the impact of climate change visualization
          </h4>

          <p className="subText">
            You are invited to participate in our study called
            <strong>
              {" "}
              "A study on the impact of climate change visualization."
            </strong>
          </p>

          <p className="subText">This study will take around 30 minutes.</p>

          <p className="subText">
            Our goal is to understand how interactive data visualizations can
            support public understanding and involvement in climate change
            issues. The results from this experiment will help inform the design
            of visualizations that more effectively raise awareness and
            encourage meaningful engagement.
          </p>

          <p className="subText">
            Please participate in this experiment only if you meet all of the
            following criteria:
          </p>
          <ul className="subText">
            <li>You are fluent in English</li>
            <li>You are at least 18 years old</li>
            <li>
              You do not have <strong>low vision</strong> or{" "}
              <strong>any form of color vision deficiency</strong>
            </li>
            <li>You are completing this survey on a computer screen</li>
          </ul>

          <p className="subText">
            <strong>
              You can only participate using a computer screen, as a mobile
              phone's screen is too small to display the visualizations
              correctly.
            </strong>
          </p>

          <p className="subText">
            After agreeing to the terms (on the next page), you will begin the
            experiment. You will be seated at a computer with a screen and
            keyboard, and you will follow the instructions displayed on the
            screen. The tasks will include answering questionnaires, reading
            content, interacting with visualizations, and solving quizzes. Most
            activities will be completed on the computer; however, at certain
            points, the researcher may provide you with paper materials and a
            pen, which will require you to read or write by hand. The researcher
            will be present throughout the process, and you are welcome to ask
            questions at any time. Your responses during the study will be
            recorded.
          </p>

          <p className="subText">
            This study is conducted by Jihyun Park (Intern researcher, ILDA
            Team, Inria Saclay) under the supervision of Florent Cabric and
            Vanessa Peña Araya. If you have any questions or concerns about the
            study, please feel free to contact Jihyun Park at{" "}
          </p>

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

          <h4 className="titleText">Purpose of the research project:</h4>

          <p className="subText">
            Version 2: The purpose of this research is to investigate how
            different visual representations of climate change data influence
            public understanding and engagement with the issue.
          </p>

          <h4 className="titleText">What is expected from you:</h4>
          <p className="subText">
            The experiment is expected to last approximately 25 minutes. You
            will be seated at a computer with a screen and keyboard. You can
            proceed with what the computer prompts you to do. It will include
            answering questionnaires, reading, and interacting with the
            visualization. For the reading, you would be provided with the
            material on paper. When prompted by the computer, please ask the
            researcher for the paper material. Your responses throughout the
            study will be recorded.
          </p>

          <h4 className="titleText">
            Your right to withdraw from the research at any time:
          </h4>
          <p className="subText">
            Your participation in this research is voluntary, and you can stop
            at any time without providing any justification. Your decision to
            participate, refuse to participate, or stop participating will not
            result in any penalty or loss of benefits to which you are otherwise
            entitled.
          </p>

          <h4 className="titleText">
            Your rights to confidentiality and privacy:
          </h4>
          <p className="subText">
            The data obtained will be treated with the utmost confidentiality.
            Your identity will be masked using a random number (participant
            code), and no other information will reveal it. Only the principal
            investigator and supervisors will have access; you may request their
            destruction at any time by providing the participant code listed on
            the consent form.
          </p>

          <h4 className="titleText">Benefits of the study:</h4>
          <p className="subText">
            You may become more informed about the issue of climate change and
            its potential impacts.
          </p>

          <h4 className="titleText">Possible risks of the study:</h4>
          <p className="subText">
            While there are no anticipated physical risks, some participants may
            experience temporary feelings of anxiety or concern when engaging
            with information about climate change projections.
          </p>

          <h4 className="titleText">Dissemination:</h4>
          <p className="subText">
            The results of this research will be used for academic purposes,
            primarily for the completion of a master's thesis.
          </p>

          <h4 className="titleText">Your right to ask questions:</h4>
          <p className="subText">
            You may ask questions about the research at any time(before, during,
            and after your participation) by contacting the project's principal
            investigator.(
            <a href="mailto:jihyun.park@inria.fr">jihyun.park@inria.fr</a>).
          </p>

          <h4 className="titleText">Consent to paticipate:</h4>
          <p className="subText">
            You can now sign the consent form given to you. By doing it, you
            certify that you have read and understood the information above,
            that the researcher has answered your questions satisfactorily, and
            that you have been advised that you are free to withdraw your
            consent or withdraw from this research at any time.
          </p>

          <label className="checkBox">
            I have signed the consent form:
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
        </div>
      </div>
    </div>
  );
}

export default Intro;
