import { useState } from "react";

const FACTOR = 0.238;
export const App = () => {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [power, setPower] = useState("");
  const [kcal, setKcal] = useState("");
  const [result, setResult] = useState("");
  const [factor, setFactor] = useState(FACTOR.toString());

  const calculate = () => {
    const min = parseFloat(minutes) || 0;
    const sec = parseFloat(seconds) || 0;
    const totalTime = min * 60 + sec;
    const p = parseFloat(power);
    const k = parseFloat(kcal);

    const f = parseFloat(factor) * 4200;

    const timeEntered = minutes !== "" || seconds !== "";
    const powerEntered = power !== "";
    const kcalEntered = kcal !== "";

    const filled = [timeEntered, powerEntered, kcalEntered].filter(
      Boolean
    ).length;

    if (filled !== 2) {
      setResult("Please enter exactly two values.");
      return;
    }

    let computed;

    if (!timeEntered) {
      if (p === 0 || k === 0) {
        setResult("Power and kcal must be non-zero.");
        return;
      }
      computed = (k * f) / p;
      const computedMin = Math.floor(computed / 60);
      const computedSec = Math.round(computed % 60);
      setResult(`Calculated Time: ${computedMin} min ${computedSec} sec`);
    } else if (power === "") {
      if (totalTime === 0 || k === 0) {
        setResult("Time and kcal must be non-zero.");
        return;
      }
      computed = (k * f) / totalTime;
      setResult(`Calculated Power: ${computed.toFixed(2)} watts`);
    } else if (kcal === "") {
      computed = (totalTime * p) / f;
      setResult(`Calculated kcal: ${computed.toFixed(2)} kcal`);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Bike energy calculator</h2>

      <p>Enter any two of the three values below to calculate the third:</p>

      <div style={{ marginBottom: "1rem" }}>
        <label>Time: </label>
        <input
          style={{ marginLeft: "4px" }}
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <label style={{ marginLeft: "4px" }}>minutes</label>
        <input
          style={{ marginLeft: "8px" }}
          type="number"
          placeholder="Seconds"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
        <label style={{ marginLeft: "4px" }}>seconds</label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Power (watts): </label>
        <input
          type="number"
          value={power}
          onChange={(e) => setPower(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Energy (kcal): </label>
        <input
          type="number"
          value={kcal}
          onChange={(e) => setKcal(e.target.value)}
        />
      </div>

      <button onClick={calculate}>Calculate</button>

      <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{result}</p>

      <hr></hr>

      <h3>Settings</h3>
      <div style={{ marginBottom: "1rem" }}>
        <label>Efficiency factor: </label>
        <input
          type="number"
          value={factor}
          onChange={(e) => setFactor(e.target.value)}
        />
        <div style={{ fontSize: "small", marginTop: "4px" }}>
          This is the number 0-1 representing the efficiency of the human body.
          <br />1 would be 100% of energy burned in total is sent to the pedals.
          <br />
          The usual range is 0.2 - 0.25, from my own workout data 0.238 is my
          value.
        </div>
      </div>
    </div>
  );
};
