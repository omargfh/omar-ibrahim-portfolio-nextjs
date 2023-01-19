import React, { useRef, useState, useEffect } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

function Component() {
  const [color, setColor] = useState(0x3203e1);
  useEffect(() => {
     setColor((22<<16) + (178<<8) + 96);
  }, []);
  const randomColor = () => Math.floor(Math.random()*255);
  const setRandomColor = () => {
    const r = randomColor();
    const g = randomColor();
    const b = randomColor();
    setColor((r << 16) + (g<<8) + b);
  }
  const hexString = (hex) => {
    return "#" + hex.toString(16).toUpperCase();
  }
  const rgb = (hex) => {
    return {
      r: (hex >> 16),
      g: (hex & 0x00FF00) >> 8,
      b: (hex & 0x0000FF)
    }
  }
  const RGB = ({hex}) => {
    const constit = rgb(hex);
    return (<p>rgb({constit.r}, {constit.g}, {constit.b})</p>)
  }

  const [text, setText] = useState('Copy CSS');
  const handleCopy = () => {
    navigator.clipboard.writeText(`background-color: ${hexString(color)}`).then(() => {
        setText('Copied');
        setTimeout(() => setText('Copy CSS') , 1000);
    });
  }

  return (
    <div className="home" style={{'backgroundColor': hexString(color)}}>
      <div className="container">
        <h1>Random Color Generator</h1>
        <div className="color" style={{'backgroundColor': hexString(color)}}>
        </div>
        <p>{hexString(color)}</p>
        <RGB hex={color} />
        <div className="buttons">
          <input type="button" className="btn" onClick={setRandomColor} value="Change Color" />
        <input type="button" className="btn btn-secondary" onClick={handleCopy} value={text} />
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<Component />, document.getElementById("root"));