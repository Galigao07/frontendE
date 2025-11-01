import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// CSS styles with proper TypeScript types
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex:9999,
  },
  overlay: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    zIndex: 999999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
  },
  spinner: {
    width: "64px",
    height: "64px",
    position: "relative",
    margin: "0 auto",
    left:'25px',
    top:'15px',
  },
  Cspinner:{
  width:'200px',
  textAlign: "center",
  padding: "25px",
  borderRadius: "10px",
  backgroundColor:"#b9b8c565",
  background:'transparent',
  boxShadow: "0 1px 5px rgba(0, 1, 1, 1.2)" // <-- added shadow
  },
  dot: {
    position: "absolute",
    width: "12px",
    height: "24px",
    background: "#0754edff",
    borderRadius: "6px",
    transformOrigin: "center 32px",
    animation: "fade 1.2s linear infinite",
  },
  message: {
    position:'relative',
    marginTop: "20px",
    color: "#373535ff",
    fontSize: "15px",
    fontStyle: "italic",
    fontWeight: 900,
    textAlign: "center",
    top:'20px',
  },
  
};

export const InProgressLoading: React.FC = () => {
  const dots = Array.from({ length: 12 });

  useEffect(() => {
    // Insert keyframes dynamically
    const styleSheet = document.styleSheets[0];
    const rule = `@keyframes fade { 0%{opacity:1} 50%{opacity:0.3} 100%{opacity:1} }`;
    styleSheet.insertRule(rule, styleSheet.cssRules.length);
  }, []);

  return (
    <AnimatePresence>
      <div style={styles.container}>
        <motion.div
          style={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            style={styles.Cspinner}
          >
            <div style={styles.spinner}>
              {dots.map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.dot,
                    transform: `rotate(${i * 30}deg) translateY(-20px)`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <p style={styles.message}>Please wait...</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
