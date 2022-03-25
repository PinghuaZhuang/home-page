import { $, bus } from "@/utils";
import "./intro.scss";
import { backgroundConfig } from "@/var";
// import delay from 'lodash/delay'
import { autoMultipleSplats } from "@/asserts/background";

bus.on("introLeave", () => {
  backgroundConfig.SWITCHED = true;
});
bus.on("introEnterBefore", () => {
  backgroundConfig.SWITCHED = false;
  autoMultipleSplats();
});

// 进入的时候, 开启动画
export const enterAction = function (fullpageApi) {
  const moveTo = () => {
    fullpageApi.moveTo(2);
  };

  $(".enter").addEventListener("click", moveTo);

  document.querySelectorAll(".arrow").forEach((ele) => {
    ele.addEventListener("click", moveTo);
  });
};

export function onLeave(origin, destination, direction) {
  if (origin.anchor !== destination.anchor) {
    if (origin.anchor === "intro") {
      bus.emit(`introLeave`, origin, destination, direction);
    } else if (origin.anchor === "main" && destination.anchor === "intro") {
      bus.emit(`introEnterBefore`, origin, destination, direction);
    }
  }
}

export function afterLoad(origin, destination, direction) {
  if (origin.anchor !== destination.anchor) {
    if (destination.anchor === "intro") {
      bus.emit(`introEnter`, origin, destination, direction);
    }
  }
}

// 进入的时候, 开启动画
// document.addEventListener('DOMContentLoaded', () => {
//   const animationEles = document.querySelectorAll('.content-intro .animate__animated')
//   bus.on(`introLeve`, () => {
//     animationEles.forEach(ele => {
//       Array.from(ele.classList)
//         .filter(className => /animate__[a-z]+/.test(className) && className !== 'animate__animated')
//         .forEach(className => {
//           ele.animateClassName = className
//           ele.classList.remove(className)
//         })
//     })
//   })
//   bus.on(`introEnter`, () => {
//     animationEles.forEach(ele => ele.classList.add(ele.animateClassName))
//   })
// })

// export function afterLoad(origin, destination, direction) {
//   if (origin.anchor !== destination.anchor) {
//     if (origin.anchor === 'intro') {
//       bus.emit(`introLeve`)
//     }/*  else if (destination.anchor === 'intro') {
//       bus.emit(`introEnter`)
//     } */
//   }
// }
