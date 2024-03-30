import React, { useState } from "react";

const buttons = [
  { text: "AC", bg: "rgba(255,255,255,0.7)", type: "clear", aspect: "1" },
  {
    text: "<",
    bg: "rgba(255,255,255,0.7)",
    type: "backspace",
    aspect: "1",
  },
  { text: "%", bg: "rgba(255,255,255,0.7)", type: "operator", aspect: "1" },
  { text: "/", bg: "rgba(255,255,255,0.7)", type: "operator", aspect: "1" },
  { text: "7", type: "number", aspect: "1" },
  { text: "8", type: "number", aspect: "1" },
  { text: "9", type: "number", aspect: "1" },
  { text: "x", bg: "rgba(255,255,255,0.7)", type: "operator", aspect: "1" },
  { text: "4", type: "number", aspect: "1" },
  { text: "5", type: "number", aspect: "1" },
  { text: "6", type: "number", aspect: "1" },
  { text: "-", bg: "rgba(255,255,255,0.7)", type: "operator", aspect: "1" },
  { text: "1", type: "number", aspect: "1" },
  { text: "2", type: "number", aspect: "1" },
  { text: "3", type: "number", aspect: "1" },
  { text: "+", bg: "rgba(255,255,255,0.7)", type: "operator", aspect: "1" },
  { text: "0", type: "number", aspect: "1" },
  { text: "=", bg: "rgba(255,255,255,0.7)", type: "equal", aspect: "3" },
];

function App() {
  const [expression, setExpression] = useState("");

  const handleButtonClick = (button) => {
    switch (button.type) {
      case "number":
      case "operator":
        setExpression((prevExpression) => {
          if (prevExpression.length >= 14) return prevExpression;
          if (prevExpression === "0" && button.text === "0")
            return prevExpression;
          if (prevExpression === "0") return button.text;
          return prevExpression + button.text;
        });
        break;
      case "decimal":
        setExpression((prevExpression) => {
          if (!prevExpression.includes(".") && prevExpression.length < 13) {
            return prevExpression + button.text;
          }
          return prevExpression;
        });
        break;
      case "clear":
        setExpression("");
        break;
      case "backspace":
        setExpression((prevExpression) => prevExpression.slice(0, -1));
        break;
      case "equal":
        try {
          let result = eval(expression.replace("x", "*"));
          if (Number.isFinite(result)) {
            result = parseFloat(result.toFixed(10));
            setExpression(result.toString());
          } else {
            setExpression("Error");
          }
        } catch (error) {
          setExpression("Error");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full poppins-medium h-screen flex items-center justify-center overflow-hidden bg-blue-100">
      <div className="calculator bg-blue-300 border-4 border-blue-400 shadow-xl shadow-blue-900/30 rounded-3xl w-[400px] h-[600px] p-10">
        <div className="screen overflow-hidden text-clip w-full bg-gradient-to-br from-white/80 to-white/50 h-[100px] rounded-xl border flex items-center justify-end px-5 text-3xl text-black/60 shadow-md">
          {expression || "0"}
        </div>
        <div className="buttons grid gap-2 grid-cols-4 w-full h-3/4 mt-9">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="bg-white/20 rounded-full shadow-md hover:bg-white/40 transition-all duration-300 text-black/60 text-3xl flex items-center justify-center text-center"
              style={{
                backgroundColor: `${button.bg}`,
                gridColumn: `span ${button.aspect}`,
              }}
              onClick={() => handleButtonClick(button)}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
