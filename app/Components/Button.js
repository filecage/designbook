import React, {useState} from 'react';

export default (props) => {
    const [toggled, setToggle] = useState(false);

    if (toggled) {
        return <button onClick={() => setToggle(false)}>Click me again</button>
    }

    return <button onClick={() => setToggle(true)}>I am a button for {props.for}</button>;
}