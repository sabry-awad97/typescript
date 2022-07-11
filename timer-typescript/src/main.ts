import "./style.css";
import { Timer } from "./timer";

const durationInput = document.querySelector("#duration") as HTMLInputElement;
const startButton = document.querySelector("#start") as HTMLButtonElement;
const pauseButton = document.querySelector("#pause") as HTMLButtonElement;
const circle = document.querySelector("circle") as SVGCircleElement;

const perimeter = 2 * Math.PI * circle.r.baseVal.value;

let duration = 0;
new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    circle.setAttribute("stroke-dasharray", perimeter.toString());
    duration = totalDuration;
  },
  onTick(time) {
    const offset = (perimeter * time) / duration - perimeter;
    circle.setAttribute("stroke-dashoffset", offset.toString());
  },
  onComplete() {
    console.log("Timer is completed");
  },
});
