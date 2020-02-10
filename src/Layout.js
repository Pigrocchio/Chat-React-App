import React from "react";
import "./App.css";
import { CTX } from "./Store";

import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

function Layout() {
    let { allChats } = React.useContext(CTX);

    return <div className="Layout">
        {!allChats.user ? <LoginForm /> : <Dashboard />}
    </div>;
}

export default Layout;
