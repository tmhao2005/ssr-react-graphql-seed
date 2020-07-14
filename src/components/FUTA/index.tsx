import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";

export const Futa: React.FC = () => {
  const slider = React.useRef<any>();

  const onDone = () => () => {
    slider.current.increment();
  };

  return (
    <Carousel
      ref={slider}
      showThumbs={false}
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      useKeyboardArrows={false}
      dynamicHeight={false}
      emulateTouch={false}
      swipeable={false}
    >
      <Step1 slider={slider} onDone={onDone()} />
      <Step2 slider={slider} onDone={onDone()} />
      <Step3 slider={slider} onDone={onDone()} />
      <Step4 slider={slider} onDone={onDone()} />
    </Carousel>
  );
};
