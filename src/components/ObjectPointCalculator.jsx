import React, { useState } from "react";
import "./objectpoint.css";

const ObjectPointCalculator = () => {
  const [number_of_screen, setNumberOfScreens] = useState(0);
  const [number_of_views, setNumberOfViews] = useState(0);
  const [number_of_report, setNumberOfReports] = useState(0);
  const [number_of_sections, setNumberOfSections] = useState(0);
  const [percentage_of_reuse_of_object_point, setPercentageOfReuse] =
    useState(0);
  const [developer_experience, setDeveloperExperience] = useState("Nominal");
  const [case_capability, setCaseCapability] = useState("Nominal");
  const [objectPoints, setObjectPoints] = useState(0);
  const [newObjectPoints, setNewObjectPoints] = useState(0);
  const [productivity, setProductivity] = useState(0);
  const [effort, setEffort] = useState(0);
  const handleCalculate = () => {
    // Calculate screen complexity
    let complexity;
    if (number_of_views < 3) {
      if (number_of_screen < 8) {
        complexity = "simple";
      } else {
        complexity = "medium";
      }
    } else if (number_of_views >= 3 && number_of_views < 8) {
      if (number_of_screen < 4) {
        complexity = "simple";
      } else if (number_of_screen < 8) {
        complexity = "medium";
      } else {
        complexity = "difficult";
      }
    } else {
      if (number_of_screen < 4) {
        complexity = "medium";
      } else {
        complexity = "difficult";
      }
    }

    // Calculate report complexity
    let report_complexity;
    if (number_of_sections < 2) {
      if (number_of_report < 8) {
        report_complexity = "simple";
      } else {
        report_complexity = "medium";
      }
    } else if (number_of_sections < 4) {
      if (number_of_report < 4) {
        report_complexity = "simple";
      } else if (number_of_report < 8) {
        report_complexity = "medium";
      } else {
        report_complexity = "difficult";
      }
    } else {
      if (number_of_report < 4) {
        report_complexity = "medium";
      } else {
        report_complexity = "difficult";
      }
    }

    // Calculate object points
    let screen_value, report_value;

    if (complexity === "simple") {
      screen_value = 1;
    } else if (complexity === "medium") {
      screen_value = 2;
    } else {
      screen_value = 3;
    }

    if (report_complexity === "simple") {
      report_value = 2;
    } else if (report_complexity === "medium") {
      report_value = 5;
    } else {
      report_value = 8;
    }

    const object_points =
      number_of_screen * screen_value + number_of_report * report_value;

    // Calculate new object points
    const new_object_points =
      (object_points * (100 - percentage_of_reuse_of_object_point)) / 100;

    // Calculate productivity
    const prod =
      (experience_values[developer_experience] + case_values[case_capability]) /
      2;

    // Calculate effort
    const eff = new_object_points / productivity;
    setObjectPoints(object_points)
    setNewObjectPoints(new_object_points)
    setProductivity(prod)
    setEffort(eff)
    // Print the results (you can display them as you like)
    console.log(`Object Points: ${object_points}`);
    console.log(`New Object Points: ${new_object_points}`);
    console.log(`Productivity: ${productivity}`);
    console.log(`Effort: ${effort}`);
  };


  return (
    <div className='object-point-calculator'>
      <h2>Object Point Calculator</h2>
      <div className='input-container'>
        <label>Number of Screens:</label>
        <input
          type='number'
          value={number_of_screen}
          onChange={(e) => setNumberOfScreens(e.target.value)}
        />
      </div>
      <div className='input-container'>
        <label>Number of Views:</label>
        <input
          type='number'
          value={number_of_views}
          onChange={(e) => setNumberOfViews(e.target.value)}
        />
      </div>
      <div className='input-container'>
        <label>Number of Reports:</label>
        <input
          type='number'
          value={number_of_report}
          onChange={(e) => setNumberOfReports(e.target.value)}
        />
      </div>
      <div className='input-container'>
        <label>Number of Report Sections:</label>
        <input
          type='number'
          value={number_of_sections}
          onChange={(e) => setNumberOfSections(e.target.value)}
        />
      </div>
      <div className='input-container'>
        <label>Percentage of Reuse of Object Point:</label>
        <input
          type='number'
          value={percentage_of_reuse_of_object_point}
          onChange={(e) => setPercentageOfReuse(e.target.value)}
        />
      </div>
      <div className='radio-container'>
        <label>Developer's Experience:</label>
        {Object.keys(experience_values).map((value) => (
          <label key={value}>
            <input
              type='radio'
              value={value}
              checked={developer_experience === value}
              onChange={() => setDeveloperExperience(value)}
            />
            {value}
          </label>
        ))}
      </div>
      <div className='radio-container'>
        <label>CASE Maturity and Capability:</label>
        {Object.keys(case_values).map((value) => (
          <label key={value}>
            <input
              type='radio'
              value={value}
              checked={case_capability === value}
              onChange={() => setCaseCapability(value)}
            />
            {value}
          </label>
        ))}
      </div>
      <button onClick={handleCalculate}>Calculate</button>

      <div>
        <p>
          Object Points : <input value={objectPoints.toFixed(2)} readOnly />
        </p>
        <p>
          New Object Points :{" "}
          <input value={newObjectPoints.toFixed(2)} readOnly />
        </p>
        <p>
          Productivity : <input value={productivity.toFixed(2)} readOnly />
        </p>
        <p>
          Effort : <input value={effort.toFixed(2)} readOnly />
        </p>
      </div>
    </div>
  );
};

const experience_values = {
  Very_Low: 4,
  Low: 7,
  Nominal: 13,
  High: 25,
  Very_High: 25,
};

const case_values = {
  Very_Low: 4,
  Low: 7,
  Nominal: 13,
  High: 25,
  Very_High: 25,
};

export default ObjectPointCalculator;
