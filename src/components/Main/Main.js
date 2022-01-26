import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import './_Main.scss';
import LayoutForm from '../Form/LayoutForm.js';
import BackgroundForm from '../Form/BackgroundForm.js';
import AssetsForm from '../Form/AssetsForm.js';
import RatioForm from '../Form/RatioForm.js';
import Asset from '../Asset/Asset.js';
import { BsDownload } from "react-icons/bs";

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const ratioList = [
    { heightRatio: 1, text: '1:1' },
    { heightRatio: 3 / 4, text: '4:3' },
    {
        heightRatio: 402.094 / 768,
        outputWidth: 768, outputHeight: 402.094, text: 'Velog', subText: '(768:402.094)',
        icon: <img src='https://media.vlpt.us/images/velog/profile/9aa07f66-5fcd-41f4-84f2-91d73afcec28/green%20favicon.png?w=240)' />
    },
    {
        heightRatio: 720 / 1280,
        outputWidth: 1280, outputHeight: 720, text: 'Youtube', subText: '(1280:720)',
        icon: <svg viewBox="0 0 28 20" preserveAspectRatio="xMidYMid meet" focusable="false"><g viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet" ><g ><path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"></path><path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"></path></g></g></svg>
    },
];

function Main() {
    const [windowWidth, windowHeight] = useWindowSize();
    const [canvasSize, setCanvasSize] = useState({ width: 400, height: 300 });
    const [ratio, setRatio] = useState(ratioList[2]);
    const [layout, setLayout] = useState(null);
    const [background, setBackground] = useState({ type: null, background: null, index: null });
    const [assetStyle, setAssetStyle] = useState({ fontSize: '14px', height: 0, width: 0 });
    const canvasBox = useRef(null);
    const [canvasAssets, setCanvasAssets] = useState([]);
    const [currentAsset, setCurrentAsset] = useState({ index: null, type: null, style: {} });
    // | canvasMaxWidth * ratio.heightRatio
    useEffect(() => {
        setCanvasSize({ ...canvasSize, width: canvasBox.current.clientWidth });
    }, [windowWidth])

    useEffect(() => {
        if (currentAsset.index != null) {
            setAssetStyle({ ...currentAsset.style })
        }
    }, [currentAsset])

    function handleResizeCanvas(e) {
        const { name, value } = e.target;
        setCanvasSize({ ...canvasSize, [name]: Number(value) });
    }

    useEffect(() => {
        setCanvasSize({ width: canvasBox.current.clientWidth, height: canvasBox.current.clientWidth * ratio.heightRatio })
    }, [ratio])
    return (
        < main >
            <div className="center-box">
                <section className="section-canvas">
                    <div className="input-canvas-size-wrap">
                        <input type="number" min={0} defaultValue={canvasSize.width} name="width" value={canvasSize.width} onChange={handleResizeCanvas} />X
                        <input type="number" min={0} defaultValue={canvasSize.height} name="height" value={canvasSize.height} onChange={handleResizeCanvas} />
                    </div>
                    <div className="canvas-box" ref={canvasBox}>
                        <div className="canvas" style={Object.assign({
                            width: canvasSize.width,
                            height: canvasSize.height
                        }, background.type === "image" ?
                            { backgroundImage: `url(${background.background})` } :
                            { background: background.background })}>
                            {background.background}{background.type}{background.index}
                            {canvasAssets.map((element, index) =>
                                <Asset setCurrentAsset={setCurrentAsset} currentAsset={currentAsset} key={index} index={index} asset={element} assetStyle={assetStyle} setAssetStyle={setAssetStyle} ></Asset>
                            )}
                        </div>
                    </div>
                    <button className="btn-download btn-main"><BsDownload />Download</button>
                </section>
                <section className="section-form">
                    <RatioForm setRatio={setRatio} ratioList={ratioList} />
                    <LayoutForm setLayout={setLayout} />
                    <BackgroundForm setBackground={setBackground} />
                    <AssetsForm assets={canvasAssets} setCanvasAssets={setCanvasAssets} currentAsset={currentAsset} assetStyle={assetStyle} setAssetStyle={setAssetStyle} />
                </section>
            </div>
        </main >
    );
}

export default Main;