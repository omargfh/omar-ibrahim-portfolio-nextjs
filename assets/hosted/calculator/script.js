import React, {
  useState,
  useCallback,
  useEffect,
  useRef
} from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const ops = ["+", "-", "*", "/"];

const options = ["CE", "-M", "DEL", "="];

const CalculatorDisplay = ({ value }) => {
  return (
    <div id="calculator-display">
      <input className="display-content" value={value}></input>
    </div>
  );
};
const CalculatorButtons = ({ onPress }) => {
  const buttons = [
    ["CE", "DEL"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"]
  ];
  return (
    <div id="calculator-buttons">
      {buttons.map((row, i) => {
        const ln = row.length;
        const row_buttons = row.map((e, i) => {
          let classSuffix = "fill-1";
          if (i === 0 && ln < 4) {
            classSuffix = "fill-" + (5 - ln);
          }
          return (
            <div
              key={e}
              className={["button-" + e, classSuffix, "button"].join(" ")}
              onClick={() => onPress(e)}
            >
              {e}
            </div>
          );
        });
        return (
          <div className={"row row-" + i} key={"row-" + i}>
            {row_buttons}
          </div>
        );
      })}
    </div>
  );
};
const Calculator = () => {
  const [exp, setExp] = useState("");
  const [negative, setNegative] = useState(false);
  const [lastOp, setLastOp] = useState("");

  const expEndsWith = (arr) => {
    return arr.reduce((p, c) => {
      return p || exp.endsWith(c);
    }, false);
  };

  const del = (str) => {
    return str.substring(0, str.length - 1);
  };

  const allowed = (pressed) =>
    [...ops, ...options, "."].includes(pressed) || !isNaN(pressed);

  const onPress = (pressed) => {
    if (!allowed(pressed)) {
      return;
    }

    if (options.includes(pressed)) {
      if (pressed === "CE") {
        setExp("");
      } else if (pressed === "-M") {
        setNegative(!negative);
      } else if (pressed === "DEL") {
        setExp(del(exp));
      } else if (pressed === "=") {
        setExp("" + eval(exp));
      }
      return;
    }

    if (expEndsWith(["."]) && isNaN(pressed)) {
      return;
    }
    expEndsWith(ops) && ops.includes(pressed) && setExp(del(exp) + pressed);
    (!expEndsWith(ops) || !ops.includes(pressed)) && setExp(exp + pressed);
  };

  const handleKeyPress = (e) => {
    const btn = document.querySelector(".button-" + e.key);
    if (!btn) {
      return;
    }
    btn.classList.add("pressed");
    setTimeout(() => {
      btn.classList.contains("pressed") && btn.classList.remove("pressed");
    }, 200);
    btn.click();
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <div className="calculator-container">
      <CalculatorDisplay value={exp} />
      <CalculatorButtons onPress={onPress} />
    </div>
  );
};

function App() {
  return <Calculator />;
}

ReactDOM.render(<App />, document.getElementById("root"));
