/**
 * @file ContactLink.tsx
 * @module ContactLink
 * @author Joshua Linehan
 */

import React from "react";
import "./ContactLink.css";

/**
 * @returns {React.ReactElement}
 */
function ContactLink(): React.ReactElement {
    const labelText: string = "Contact: ";
    const emailAddress: string = "boxbreathingtechniqueonline@gmail.com";
    return (
        <h2 className="ContactLink">
            {labelText}
            <a
                className="ContactLink"
                href={`mailto:${emailAddress}`}
            >
                {emailAddress}
            </a>
        </h2>
    );
}

export default ContactLink;
