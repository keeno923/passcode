import { useState } from 'react';
import './App.css';

function DisplayScreen({ text }) {
  return (
    <div className="screenDisplay">
      {text}
    </div>
  );
}

function KeypadButton({ label, onPress }) {
  return (
    <button className="keypadButton" onClick={onPress}>
      {label}
    </button>
  );
}

function App() {
  const [accessCode, setAccessCode] = useState("1234567890");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("INPUT CODE");
  const [codeChangeStep, setCodeChangeStep] = useState(0);

  const handleNumberPress = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (!/^[0-9]$/.test(value)) return;
    setInput(prev => prev + value);
    if (/^(INPUT CODE|ENTER CURRENT CODE|ENTER NEW CODE|INVALID CODE|CODE SHOULD BE 8 DIGITS|CHANGE CODE SUCCESSFUL|OPEN|LOCKED|ERNZ DANIELLE D\. MANALO|CPEITEL3)$/.test(message)) {
      setMessage(value);
    } else {
      setMessage(prev => prev + value);
    }
  };

  const handleEnterPress = () => {    
    if (codeChangeStep === 0) {
      setMessage(input === accessCode ? "OPEN" : "LOCKED");
    } else if (codeChangeStep === 1) {
      if (input === accessCode) {
        setMessage("ENTER NEW CODE");
        setCodeChangeStep(2);
      } else {
        setMessage("INVALID CODE");
      }
    } else if (codeChangeStep === 2) {
      if (input.length >= 8) {
        setAccessCode(input);
        setMessage("CHANGE CODE SUCCESSFUL");
        setCodeChangeStep(0);
      } else {
        setMessage("CODE SHOULD BE 8 DIGITS");
      }
    }
    setInput("");
  };

  const handleClearPress = () => {
    setInput("");
    setMessage("INPUT CODE");
  };

  const handleNamePress = () => {
    setInput("");
    setMessage("KEENO QUIROZ");
  };

  const handleCoursePress = () => {
    setInput("");
    setMessage("CPEITEL3");
  };

  const handleCodeChangePress = () => {
    setInput("");
    setMessage("ENTER CURRENT CODE");
    setCodeChangeStep(1);
  };

  return ( 
    <div className="container">
      <DisplayScreen text={message}/>
      <div className="buttonGrid">
        {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map(num => (
          <KeypadButton key={num} label={num} onPress={handleNumberPress} />
        ))}
        <KeypadButton label="RESET" onPress={handleClearPress} />
        <KeypadButton label="0" onPress={handleNumberPress} />
        <KeypadButton label="ENTER" onPress={handleEnterPress} />
        <KeypadButton label="NAME" onPress={handleNamePress} />
        <KeypadButton label="SUBJ" onPress={handleCoursePress} />
        <KeypadButton label="PIN" onPress={handleCodeChangePress} />
      </div>  
    </div>  
  );
}

export default App;