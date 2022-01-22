import React from 'react';
import './_Main.scss';
import LayoutForm from '../Form/LayoutForm.js';
import BackgroundForm from '../Form/BackgroundForm.js';
import AssetsForm from '../Form/AssetsForm.js';
import { BsDownload } from "react-icons/bs";


function Main() {
    return (
        <main>
            <section className="section-canvas">
                <div className="canvas-box">
                    <canvas width="" height=""></canvas>
                </div>
                <button className="btn-download btn btn-full"><BsDownload />Download</button>
            </section>
            <section className="section-form">
                <LayoutForm />
                <BackgroundForm />
                <AssetsForm />
            </section>

        </main>
    );
}

export default Main;