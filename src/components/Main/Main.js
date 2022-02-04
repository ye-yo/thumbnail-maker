import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import './_Main.scss';
import LayoutForm from '../Form/LayoutForm.js';
import BackgroundForm from '../Form/BackgroundForm.js';
import AssetsForm from '../Form/AssetsForm.js';
import RatioForm from '../Form/RatioForm.js';
import Asset from '../Asset/Asset.js';
import { BsDownload } from "react-icons/bs";
import domtoimage from 'dom-to-image';

const ratioList = [
    { aspectRatio: { width: 1, height: 1 }, text: '1:1', id: 'ratio_0', outputWidth: 400, outputHeight: 400, },
    { aspectRatio: { width: 3, height: 4 }, text: '4:3', id: 'ratio_1', outputWidth: 533.3333, outputHeight: 400, },
    {
        aspectRatio: { width: 402.094, height: 768 },
        id: 'ratio_2',
        outputWidth: 768, outputHeight: 402.094, text: 'Velog', subText: '(768x402.094)',
        icon: <img src='https://media.vlpt.us/images/velog/profile/9aa07f66-5fcd-41f4-84f2-91d73afcec28/green%20favicon.png?w=240)' />
    },
    {
        aspectRatio: { width: 9, height: 16 },
        id: 'ratio_3',
        outputWidth: 640, outputHeight: 340, text: 'Youtube', subText: '(16:9)',
        icon: <svg viewBox="0 0 28 20" preserveAspectRatio="xMidYMid meet" focusable="false"><g viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet" ><g ><path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"></path><path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"></path></g></g></svg>
    },
];

// function useWindowSize() {
//     const [size, setSize] = useState([0, 0]);
//     useLayoutEffect(() => {
//         function updateSize() {
//             setSize([window.innerWidth, window.innerHeight]);
//         }
//         window.addEventListener('resize', updateSize);
//         updateSize();
//         return () => window.removeEventListener('resize', updateSize);
//     }, []);
//     return size;
// }

function Main() {
    // const [windowWidth, windowHeight] = useWindowSize();
    const [canvasSize, setCanvasSize] = useState({ width: 400, height: 300 });
    const [ratio, setRatio] = useState(ratioList[2]);
    const [background, setBackground] = useState({ type: null, background: null, index: null });
    const [assetStyle, setAssetStyle] = useState({ fontSize: '14px', height: 'auto', width: 'auto' });
    const canvasBox = useRef(null);
    const [canvasAssets, setCanvasAssets] = useState([]);
    const [currentAsset, setCurrentAsset] = useState({ index: null, type: null, style: {}, position: {} });
    const [loading, setLoading] = useState(false);
    const Spinner = () => { return <img src={require('../../assets/images/loading.gif')} style={{ width: 16, height: 16 }}></img> }

    // useEffect(() => {
    //     setCanvasSize({ width: ratio.outputWidth, height: ratio.outputHeight })
    // }, [windowHeight])

    useEffect(() => {
        if (currentAsset.index != null) {
            setAssetStyle({ ...currentAsset.style })
        }
    }, [currentAsset])

    useEffect(() => {
        if (ratio)
            setCanvasSize({ width: ratio.outputWidth, height: ratio.outputHeight })
    }, [ratio])

    const filterNumber = /^[+]?\d+(?:[.]\d+)?$/g;
    function handleResizeCanvas(e) {
        let { name, value } = e.target;
        if (!filterNumber.test(value)) {
            if (value === "") {
                value = 0;
            }
            else {
                e.preventDefault();
                return;
            }
        };
        setRatio(null);
        uncheckedRatioBox();
        setCanvasSize({ ...canvasSize, [name]: Number(value) });
    }

    function uncheckedRatioBox() {
        let checkBoxes = document.querySelectorAll(`.ratio-list input[type=checkbox]`);
        checkBoxes.forEach(box => box.checked = false)
        checkBoxes.checked = false;
    }

    function handleDownload() {
        const element = document.getElementById('canvas');
        const scale = 2;
        const style = {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: element.offsetWidth + 'px',
            height: element.offsetHeight + 'px'
        };
        setLoading(true);
        domtoimage
            .toPng(element, {
                width: element.offsetWidth * scale,
                height: element.offsetHeight * scale,
                style: style
            })
            .then(dataUrl => {
                setLoading(false);
                handleCaptureCanvas(dataUrl, 'thumbnail.png')
            })
            .catch(error => {
                setLoading(false);
                console.error("oops, something went wrong!", error);
            });
    }

    function handleCaptureCanvas(uri, fileName) {
        let link = document.createElement('a');
        document.body.appendChild(link);
        link.href = uri;
        link.download = fileName;
        link.click();
        document.body.removeChild(link);
    }

    function removeAsset(targetId) {
        let filteredAssets = canvasAssets.filter(({ id }) => id !== targetId)
        setCanvasAssets(filteredAssets);
    }
    return (
        < main >
            <div className="center-box">
                <section className="section-canvas">
                    <div className="input-canvas-size-wrap">
                        <input type="text" name="width" value={canvasSize.width} onChange={handleResizeCanvas} />X
                        <input type="text" name="height" value={canvasSize.height} onChange={handleResizeCanvas} />
                    </div>
                    <div className="canvas-box" ref={canvasBox}>
                        <div id="canvas" className="canvas" style={Object.assign({
                            width: canvasSize.width,
                            height: canvasSize.height
                        }, background.type === "image" ?
                            { backgroundImage: `url(${background.background})` } :
                            { background: background.background })}>
                            {canvasAssets.map((element, index) =>
                                <Asset setCurrentAsset={setCurrentAsset} currentAsset={currentAsset} key={element.id}
                                    id={element.id} canvasSize={canvasSize} newAsset={element} assetStyle={assetStyle} setAssetStyle={setAssetStyle} removeAsset={removeAsset} ></Asset>
                            )}
                        </div>
                    </div>
                    <button onClick={handleDownload} className="btn-download btn-main">{loading ? <Spinner></Spinner> : <span><BsDownload />Download</span>}</button>
                </section>
                <section className="section-form">
                    <div className="section-wrap-left">
                        <RatioForm setRatio={setRatio} ratioList={ratioList} />
                        <BackgroundForm setBackground={setBackground} />
                    </div>
                    <div className="section-wrap-left">
                        <LayoutForm setCanvasAssets={setCanvasAssets} canvasAssets={canvasAssets} />
                        <AssetsForm assets={canvasAssets} setCanvasAssets={setCanvasAssets} currentAsset={currentAsset} assetStyle={assetStyle} setAssetStyle={setAssetStyle} />
                    </div>
                </section>
            </div>
        </main >
    );
}

export default Main;