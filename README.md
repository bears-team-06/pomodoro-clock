This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description 
This is reactjs implementation of [freeCodeCamp's take home challenge](https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-pomodoro-clock/).
The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks.

## Tools used
* [ReactJS](https://reactjs.org/) - This is front end single page application framework. This helped in creating highly decoupled application using state and props. 
More on it in architecture space.
* [Jest](https://jestjs.io/en/) and [Enzyme](https://airbnb.io/enzyme/) - Jest came bundled with create-react-app and we did no changes to that. 
We also added enzyme to setup to get easy snapshot tests for each of the components. Documentation of jest and enzyme was very helpful and it was easy to analyze how to test different type of components.
* [Create-react-app](https://github.com/facebook/create-react-app) - This helped in creating react app quickly. Only work was to remove extra code like for service workers.   

## Architecture
![App Architecture](https://github.com/sharadJay/pomodoro-clock/blob/1b54b9798d171d11554900de7c2f42d59678b62a/assets/pomodoroArchitecture.jpeg "App Architecture")
In our app there is single class i.e. Pomodoro clock which is aware of clock's state and is responsible of controlling and sending state as properties to other components like
timerBox, buttons and time configuration buttons. Here is description of what each component does and it's relationship with other components
### PomodoroClock
####  Maintains
* Timer state - which could be running, paused or stopped based on which button was last pressed. This is stopped by default.
* Pomodoro state - which could be in focus, short break or long time session. It is by this a timer can know which session name to display and what would be the timer length.
* Session Number - which is used in deriving Pomodoro state
* Session Name and session length -  based on pomodoro state
####  Child components and communication with them
* Start, Stop and Pause Button - Based on what timer state is disabled state is sent as prop.
* Short Break Length Configurator - Length Time and Enabled state is set by Pomodoro state.
* Focus Session Length Configurator - Length Time and Enabled state is set by Pomodoro state.
* Timer Box - this is the component where current time left is displayed along with current session name. Pomodoro clock supplies session name and start time.
### Timer Box
#### Maintains
* timeInSeconds - which reduces every second by 1.
#### Communication with App
* onTimerComplete - is called when timer completes
### Break and Session Time Configurators 
This component does not maintain any state.
#### Communication with App
* onChange - is called whenever decrement or increment is clicked.
### Start Stop Pause Button
#### Communication with App
* clickHandler - is called whenever button is pressed and app takes appropriate action.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
