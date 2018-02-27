import globalStyles from '../global-styles.scss';
import createClassNameString from '../../lib/createClassNameString';

const stepBackIcon = seconds => `
<svg class="${createClassNameString(globalStyles.svg)}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 110 161.2" style="enable-background:new 0 0 110 161.2;" xml:space="preserve">
<style type="text/css">
    .st0{fill:none;stroke:currentColor;stroke-width:10;stroke-linecap:round;stroke-miterlimit:10;}
    .st1{font-size:60px;fill:currentColor}
</style>
<g>
    <path class="st0" d="M6,88.8c0,27.1,21.9,49,49,49s49-21.9,49-49s-19.9-49-47-49H33.5"/>
    <polyline class="st0" points="50,56 32.2,39.8 50,23.5     "/>
    <polyline class="st0" points="29,56 11.2,39.8 29,23.5     "/>
</g>
<text transform="matrix(1 0 0 1 22.2207 108.75)" class="st1">${seconds}</text>
</svg>
`;

export default stepBackIcon;
