import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function Intro() {
  let [consentChecked, setConsentChecked] = useState(false);
  let [buttonClicked, setButtonClicked] = useState(false);
  let [participantCode, setParticipantCode] = useState('');
 
  if (buttonClicked) {
    return <Navigate to="/demography" />;
  }

  useEffect(()=>{
    //TODO: Prevent generating code that already exists
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) { 
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setParticipantCode(result);
  },[]);

  return (
    <div className="dropDownBody">
      <div className="main-container">
        <div className="card">
          <h4 className="instruction-text">
            Please read the following information about my research project and
            sign the consent form to proceed.
          </h4>

          <h4 className="titleText">Title of the project:</h4>
          <p className="subText">Time Until Threshold</p>

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
            Version 1: The purpose of this research is to investigate how
            different ways of visualizing climate change data affect people's
            perception of its urgency and their willingness to take action.
            Specifically, we are exploring if animating temperature projections
            on a line graph can reduce the feeling that climate change is a
            distant problem, thereby increasing your willingness to engage in
            mitigation behaviors.
          </p>

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
            I have signed the consent form:{" "}
            <input
              type="checkbox"
              name="consentCheckbox"
              onClick={() => {
                setConsentChecked(!consentChecked);
              }}
            />
          </label>

          <button
            className="userActionButton"
            disabled={!consentChecked}
            onClick={() => setButtonClicked(true)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
