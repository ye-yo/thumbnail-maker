import React from 'react';
import './_Main.scss';
import LayoutForm from '../Form/LayoutForm.js';
import BackgroundForm from '../Form/BackgroundForm.js';
import AssetsForm from '../Form/AssetsForm.js';
import RatioForm from '../Form/RatioForm.js';
import { BsDownload } from "react-icons/bs";


function Main() {
    return (
        <main>
            <div className="center-box">
                <section className="section-canvas">
                    <div className="input-canvas-size-wrap">
                        <input type="number" value="400" />X
                        <input type="number" value="300" />
                    </div>
                    <div className="canvas-box">
                        <div className="canvas" style={{ width: 400, height: 300 }}></div>
                    </div>
                    <button className="btn-download btn-main"><BsDownload />Download</button>
                </section>
                <section className="section-form">
                    <RatioForm />
                    <LayoutForm />
                    <BackgroundForm />
                    <AssetsForm />
                </section>
            </div>
        </main >
    );
}

export default Main;