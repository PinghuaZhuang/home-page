import "@/scss/index.scss";
import "./asserts/background";
import "./icons";

import Fullpage from "@/asserts/fullpage.js";
import { subTitleAction /* , bgAction */ } from "@/action";
import {
  enterAction,
  onLeave as introOnLeave,
  afterLoad as introAfterLoad,
} from "@/views/intro";
import { afterLoad as mainAfterLoad } from "@/views/main";
// import '@/views/main/fish' // 特效

const fullpageApi = new Fullpage("#fullpage", {
  anchors: ["intro", "main"],
  easing: "easeInOutCubic",
  easingcss3: "ease",
  lazyLoading: false,

  onLeave(...rest) {
    introOnLeave(...rest);
  },
  afterLoad(...rest) {
    introAfterLoad(...rest);
    mainAfterLoad(...rest);
  },

  // events
  // onLeave: function(origin, destination, direction){ console.log(1111, 'onLeave') },
  // afterLoad: function(origin, destination, direction){ console.log(1111, 'afterLoad') },
  // afterRender: function(){ console.log(1111, 'afterRender') },
  // afterResize: function(width, height){ console.log(1111, 'afterResize') },
  // afterReBuild: function(){ console.log(1111, 'afterReBuild') },
  // afterResponsive: function(isResponsive){ console.log(1111, 'afterResponsive') },
  // afterSlideLoad: function(section, origin, destination, direction){ console.log(1111, 'afterSlideLoad') },
  // onSlideLeave: function(section, origin, destination, direction){ console.log(1111, 'onSlideLeave') }
});

// 进入的时候, 开启动画
document.addEventListener("DOMContentLoaded", () => {
  // 副标题的动效
  subTitleAction();
  // 背景特效
  // bgAction()
  // 点击进入main
  enterAction(fullpageApi);
});
