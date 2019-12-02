import React from "react";
import './link-button.less';

export default class LinkButton extends React.Component{
    render() {
        return (
            <button {...this.props} className="link-button"></button>
        );
    }
}