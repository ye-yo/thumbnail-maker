import React from 'react';
import Form from './Form.js';
import './_RatioForm.scss';

import { RiLayoutBottom2Line, RiYoutubeFill } from "react-icons/ri";

function LayoutForm() {
    return (
        <Form icon={RiLayoutBottom2Line()} label="Ratio" className="section-form-ratio">
            <ul className="ratio-list">
                <li><div style={{ width: '100%', height: '100%' }}><span>1:1</span></div></li>
                <li><div style={{ width: '100%', height: '75%' }}><span>4:3</span></div></li>
                <li><div style={{ width: '100%', height: '52.355989583333%', }}>
                    <p className="icon">
                        <img src='https://media.vlpt.us/images/velog/profile/9aa07f66-5fcd-41f4-84f2-91d73afcec28/green%20favicon.png?w=240)' />
                    </p>
                    <span>velog<br></br><span>(768:402.094)</span></span></div></li>
                <li><div style={{ width: '100%', height: '56.25%' }}>
                    <p className="icon">
                        <svg viewBox="0 0 28 20" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon"><g viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet" class="style-scope yt-icon"><g class="style-scope yt-icon"><path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000" class="style-scope yt-icon"></path><path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" class="style-scope yt-icon"></path></g></g></svg>
                    </p>
                    <span>youtube<br></br><span>(1280:720)</span></span></div></li>
            </ul>
        </Form >
    );
}

export default LayoutForm;