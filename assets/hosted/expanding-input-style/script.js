import React, { useRef, useState } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const App = () => {
  const handleFocus = (e) => {
    e.target.parentNode.classList.add('focused');
  };
  const handleFocusOut = (e) => {
    console.log('hi');
    e.target.parentNode.classList.remove('focused');
  };
  const validate = (e, validator) => {
    const target = e.target.parentNode;
    const input = e.target.value;

    let pass = 0;

    if (validator === 'email') {
      const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      pass = re.test(input);
    }

    if (!pass && input) {
      target.classList.add('invalid');
    }
    else {
      target.classList.remove('invalid');
    }
  }
  return(
     <div className="container">
        <div className="row justify-content-center pt-4">
          <div className="col-md-8">
            <div className="ULM_form-field">
              <div className="indicator" />
              <label className="form-col-label ULM_form-col required" htmlFor="email">
                Email
              </label>
              <input onFocus={handleFocus} onBlur={e => { handleFocusOut(e); validate(e, 'email'); }}  className="form-control ULM_form-control" type="text" placeholder="enter your email..." autocomplete="email"/>
            </div>
          </div>
        </div>
      </div>
  );
}

ReactDOM.render(<App />,
document.getElementById("root"))