import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MouseFollower = ({ cursor, hov }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.set(containerRef.current, { xPercent: -50, yPercent: -50 });

    const xSetter = gsap.quickSetter(containerRef.current, "x", "px");
    const ySetter = gsap.quickSetter(containerRef.current, "y", "px");

    const moveImage = (e) => {
      xSetter(e.clientX);
      ySetter(e.clientY);
    };

    window.addEventListener("mousemove", moveImage);

    return () => {
      window.removeEventListener("mousemove", moveImage);
    };
  }, []);

  return (
    <div ref={containerRef} className={cursor !== "../src/assets/space/AIM2.png" && `pt-24 pl-48 z-50 ` } style={styles.container}>
        {cursor !== "../src/assets/space/AIM2.png" && <h1 className="absolute z-10 py-2 px-3 w-fit font-pixelSans text-xl text-[#FFD338]"> . . . Travel To {hov} Section</h1>}
      <img
        src={cursor}
        alt="+"
        style={{
          width: cursor === "../src/assets/space/AIM2.png" ? "40px" : "250px",
          height: cursor === "../src/assets/space/AIM2.png" ? "40px" : "110px",
          opacity: cursor === "../src/assets/space/AIM2.png" ? "1" : "0.7",
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    pointerEvents: "none",
    top: "0",
    left: "0",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
};

export default MouseFollower;
