// UpdateTriggerContext.js
import React from "react";

const UpdateTriggerContext = React.createContext({
    triggerUpdate: () => {},
    setTriggerUpdate: () => {},
});

export default UpdateTriggerContext;
