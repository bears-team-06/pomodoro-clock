import TimerState from "./TimerState";
import PomodoroState from "./PomodoroState";

const DefaultStates = {
    timerState: TimerState.Stopped,
    pomodoroState: PomodoroState.Focus,
    focusTime: 1500,
    shortBreakTime: 600,
    longBreakTime: 900,
    sessionNumber: 1
}
export default DefaultStates