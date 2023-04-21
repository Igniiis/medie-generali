# Choisir les technos du site : 



For a web app that doesn't require a database and loads all its data from the URL, you could consider using a serverless architecture with a framework like React or Vue.js.

React is a popular JavaScript library for building user interfaces. It can be used to create single-page applications (SPAs) that rely heavily on client-side rendering. With React, you can manage the state of your app using components and hooks, which makes it easy to update the UI in response to changes in the URL.

Vue.js is another popular JavaScript framework for building SPAs. It provides a similar component-based architecture to React, but with a more template-based syntax that some developers find easier to read and write.

In terms of serverless architectures, you could consider using a platform like AWS Lambda or Google Cloud Functions to host your app. These platforms allow you to write your app's logic in a variety of languages, including JavaScript (Node.js), Python, and Java.

You could also consider using a static site generator like Gatsby or Next.js to generate your web app's HTML and JavaScript files ahead of time. This approach can make your app faster to load and more SEO-friendly, since all the content is available on the initial page load.

Overall, there are many different options for building a web app without a database. The best choice will depend on your specific requirements and technical expertise.



## Exemple code météo
First, you will need to define the structure of your URL so that it contains all the information that your app needs to display. For example, if your app is a weather app, your URL might look something like this:

```php
https://my-weather-app.com?location=New+York&units=fahrenheit
```

This URL contains two parameters: location and units. These parameters will be used by your app to display the weather information for the specified location in the specified units.

Here's an example React component that extracts these parameters from the URL and displays the weather information:

```javascript
import React, { useState, useEffect } from "react";

function WeatherApp() {
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Extract the location and units from the URL
    const params = new URLSearchParams(window.location.search);
    const location = params.get("location");
    const units = params.get("units");

    // Update the state with the extracted values
    setLocation(location);
    setUnits(units);

    // Fetch the weather data based on the extracted values
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=YOUR_API_KEY`)
      .then(response => response.json())
      .then(data => setWeatherData(data));
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather in {weatherData.name}</h1>
      <p>Temperature: {weatherData.main.temp} {units}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
    </div>
  );
}

export default WeatherApp;

```

This component uses the useState and useEffect hooks to manage its state and fetch the weather data. The useEffect hook runs once when the component mounts and extracts the location and units parameters from the URL using the URLSearchParams API. It then fetches the weather data from the OpenWeatherMap API using these parameters and updates the state with the fetched data.

The component then uses conditional rendering to display a loading message while the data is being fetched, and the weather information once the data is available.

Note that you will need to replace YOUR_API_KEY with your own API key from OpenWeatherMap. Also, this is just a simple example to get you started, and you may need to modify it to fit your specific requirements.

## Code général

```javascript
import React, { useState, useEffect } from "react";

function MyApp() {
  const [param1, setParam1] = useState("");
  const [param2, setParam2] = useState("");
  const [param3, setParam3] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const param1Value = params.get("param1");
    const param2Value = params.get("param2");
    const param3Value = params.get("param3");

    setParam1(param1Value);
    setParam2(param2Value);
    setParam3(param3Value);

    // fetch data using parameters
    fetch(`https://api.example.com/data?param1=${param1Value}&param2=${param2Value}&param3=${param3Value}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>Param1: {param1}</p>
      <p>Param2: {param2}</p>
      <p>Param3: {param3}</p>
      <p>{data.description}</p>
    </div>
  );
}

export default MyApp;

```

This example uses three parameters (param1, param2, and param3) and fetches data from an API using those parameters. The useEffect hook extracts the parameter values from the URL using URLSearchParams, sets the state with the extracted values, and then fetches the data using those values.

The fetched data is stored in state, and conditional rendering is used to display a loading message until the data is available. Once the data is available, it is displayed on the page along with the parameter values extracted from the URL.

Note that you can add as many parameters as needed, and modify the API endpoint to accept those parameters. Just make sure to update the component to extract and use those parameters accordingly.


## First try at school subjects and their coefficients

```javascript
import React, { useState } from "react";

function GradeCalculator() {
  // Define the subjects and their coefficients
  const subjects = [
    { name: "Math", coeff: 4 },
    { name: "English", coeff: 3 },
    { name: "Science", coeff: 3 },
    { name: "History", coeff: 2 },
    { name: "Art", coeff: 2 }
  ];

  // Define the state for the marks of each subject
  const [marks, setMarks] = useState(
    subjects.reduce((acc, subject) => ({ ...acc, [subject.name]: "" }), {})
  );

  // Define the function to handle form submissions
  const handleSubmit = event => {
    event.preventDefault();

    // Calculate the final grade using the marks and coefficients
    const totalCoeff = subjects.reduce((acc, subject) => acc + subject.coeff, 0);
    const totalGrade = subjects.reduce((acc, subject) => {
      const mark = parseFloat(marks[subject.name]);
      const coeff = subject.coeff;

      return isNaN(mark) ? acc : acc + mark * coeff;
    }, 0);

    const finalGrade = totalGrade / totalCoeff;

    // Display the final grade
    alert(`Your final grade is ${finalGrade.toFixed(2)}`);
  };

  // Define the function to handle changes to the marks
  const handleMarkChange = event => {
    const { name, value } = event.target;
    setMarks({ ...marks, [name]: value });
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit}>
      {subjects.map(subject => (
        <div key={subject.name}>
          <label>
            {subject.name} ({subject.coeff})
            <input type="text" name={subject.name} value={marks[subject.name]} onChange={handleMarkChange} />
          </label>
        </div>
      ))}
      <button type="submit">Calculate final grade</button>
    </form>
  );
}

export default GradeCalculator;

```

This component defines an array of subjects with their coefficients, and uses the useState hook to define the state for the marks of each subject. It then defines a form with inputs for each subject, and uses the handleMarkChange function to update the state when the user enters a mark.

When the form is submitted, the handleSubmit function calculates the final grade using the entered marks and the coefficients of each subject. It then displays the final grade in an alert.

Note that this is just a basic example to get you started, and you may need to modify it to fit your specific requirements. For example, you may want to add validation to the form to ensure that only valid marks are entered.
