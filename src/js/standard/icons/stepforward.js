import globalStyles from '../global-styles.scss';
import createClassNameString from '../../lib/createClassNameString';

const stepForwardIcon = seconds => `
<svg class="${createClassNameString(globalStyles.svg)}"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 110 161.2" style="enable-background:new 0 0 110 161.2;" xml:space="preserve">
    <style type="text/css">
        .st0{fill:none;stroke:currentColor;stroke-width:8;stroke-linecap:round;stroke-miterlimit:10;}
        .st1{font-size:60px;fill:currentColor;}
    </style>
<g>
    <path class="st0" d="M104,88.8c0,27.1-21.9,49-49,49s-49-21.9-49-49s19.9-49,47-49h23.5"/>
    <polyline class="st0" points="60,56 77.8,39.8 60,23.5     "/>
    <polyline class="st0" points="81,56 98.8,39.8 81,23.5     "/>
</g>
<text transform="matrix(1 0 0 1 53 108.75)" text-anchor="middle" class="st1">${seconds}</text>
</svg>
`;

export default stepForwardIcon;
