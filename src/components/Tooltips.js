import {Tooltip} from "react-tooltip";
import React from "react";
import './Tooltips.css';

const Tooltips = () => {
    return (
        <div>
            <Tooltip anchorSelect=".incoming-solar-tooltip" place="top" className="custom-tooltip">
                The amount of solar radiation from the Sun which is intercepted by the Earth.<br/>
                This is <b className="shortwave-text">shortwave</b> radiation.
                It is approximately 342 Wm<sup>-2</sup>.
            </Tooltip>
            <Tooltip anchorSelect=".scattered-tooltip" place="bottom" className="custom-tooltip">
                The amount of <b className="shortwave-text">shortwave</b> solar radiation which is scattered by
                clouds back into space.<br/>
                This, along with the radiation reflected by earth's surface, makes up the Earth's
                albedo.
            </Tooltip>
            <Tooltip anchorSelect=".sw-absorbed-atmosphere-tooltip" place="bottom" className="custom-tooltip">
                The amount of solar radiation (<b className="shortwave-text">shortwave</b>) which is absorbed by
                water vapour (clouds) and aerosols.
            </Tooltip>
            <Tooltip anchorSelect=".reflected-tooltip" place="bottom" className="custom-tooltip">
                The amount of <b className="shortwave-text">shortwave</b> solar radiation which is reflected by
                the
                earth's surface back into space.
                <br/>This, along with the radiation scattered by clouds, makes up the Earth's albedo.
            </Tooltip>
            <Tooltip anchorSelect=".albedo-tooltip" place="top" className="custom-tooltip">
                The combination of <b className="shortwave-text">shortwave</b> solar radiation which is returned
                to
                space due to the Earth's albedo: reflected by clouds and surface.
            </Tooltip>
            <Tooltip anchorSelect=".sw-absorbed-surface-tooltip" place="top" className="custom-tooltip">
                The amount of solar radiation (<b className="shortwave-text">shortwave</b>) which is absorbed by
                Earth's surface.
            </Tooltip>
            <Tooltip anchorSelect=".gmst-tooltip" place="bottom" className="custom-tooltip">
                The Global Mean Surface Temperature
            </Tooltip>
            <Tooltip anchorSelect=".convection-tooltip" place="bottom" className="custom-tooltip">
                A combination of conduction and convection transfers heat from Earth's surface to the
                atmosphere.<br/>
                The evaporation of water extracts heat from Earth's surface and when it condenses in the
                atmosphere,
                releases the heat.
            </Tooltip>
            <Tooltip anchorSelect=".lw-surface-tooltip" place="bottom" className="custom-tooltip">
                <b className="longwave-text">Longwave</b> radiation emitted by Earth's surface as a function of
                its
                temperature.
            </Tooltip>
            <Tooltip anchorSelect=".lw-absorbed-tooltip" place="bottom" className="custom-tooltip">
                <b className="longwave-text">Longwave</b> radiation absorbed by greenhouse gases and clouds.
            </Tooltip>
            <Tooltip anchorSelect=".window-tooltip" place="top" className="custom-tooltip">
                Some of the <b className="longwave-text">longwave</b> radiation from Earth's surface (between 8
                and
                13 μm wavelength) is not absorbed by greenhouse gases so escapes directly to space.
            </Tooltip>
            <Tooltip anchorSelect=".lw-space-tooltip" place="top" className="custom-tooltip">
                Some of the heat absorbed by the atmosphere (from <b
                className="shortwave-text">shortwave</b>, <b
                className="longwave-text">longwave</b> and <b
                className="convection-text">convection &amp; latent
                heat</b>) is emitted as <b className="longwave-text">longwave</b> radiation into space.
            </Tooltip>
            <Tooltip anchorSelect=".back-radiation-tooltip" place="top" className="custom-tooltip">
                The <b className="longwave-text">longwave</b> radiation emitted by the atmosphere (from <b
                className="shortwave-text">shortwave</b>, <b
                className="longwave-text">longwave</b> and <b
                className="convection-text">convection &amp; latent
                heat</b>) <i>back</i> to Earth's surface. This is the greenhouse effect, which keeps the GMST
                over
                30 °C warmer than it otherwise would be.
            </Tooltip>
            <Tooltip anchorSelect=".ack-tooltip" place="top" className="custom-tooltip" clickable>
                Diagram inspiration: <a
                href="https://www.open.edu/openlearn/nature-environment/climate-change/">OpenLearn
                Climate Change</a><br/>
                Cloud images: <a
                href="https://www.freepik.com/free-vector/collection-3d-white-clouds-isolated-white_20111680.htm">
                Image by bs_k1d on Freepik
            </a>
            </Tooltip>
        </div>
    );
}

export default Tooltips;