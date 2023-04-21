# Choisir les technos du site : 



For a web app that doesn't require a database and loads all its data from the URL, you could consider using a serverless architecture with a framework like React or Vue.js.

React is a popular JavaScript library for building user interfaces. It can be used to create single-page applications (SPAs) that rely heavily on client-side rendering. With React, you can manage the state of your app using components and hooks, which makes it easy to update the UI in response to changes in the URL.

Vue.js is another popular JavaScript framework for building SPAs. It provides a similar component-based architecture to React, but with a more template-based syntax that some developers find easier to read and write.

In terms of serverless architectures, you could consider using a platform like AWS Lambda or Google Cloud Functions to host your app. These platforms allow you to write your app's logic in a variety of languages, including JavaScript (Node.js), Python, and Java.

You could also consider using a static site generator like Gatsby or Next.js to generate your web app's HTML and JavaScript files ahead of time. This approach can make your app faster to load and more SEO-friendly, since all the content is available on the initial page load.

Overall, there are many different options for building a web app without a database. The best choice will depend on your specific requirements and technical expertise.



## Exemple code
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
