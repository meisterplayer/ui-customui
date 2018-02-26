import globalStyles from '../global-styles.scss';
import createClassNameString from '../../lib/createClassNameString';

const qualityIcon = cssClass => `
<svg class="${createClassNameString(globalStyles.svg, cssClass)}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M0,5.99406028 C0,4.8927712 0.897026226,4 2.00494659,4 L21.9950534,4 C23.1023548,4 24,4.89451376 24,5.99406028 L24,18.0059397 C24,19.1072288 23.1029738,20 21.9950534,20 L2.00494659,20 C0.897645164,20 0,19.1054862 0,18.0059397 L0,5.99406028 Z M9,11 L6,11 L6,8 L4,8 L4,16 L6,16 L6,13 L9,13 L9,16 L11,16 L11,8 L9,8 L9,11 Z M16,16 C18.209139,16 20,14.209139 20,12 C20,9.790861 18.209139,8 16,8 L13,8 L13,16 L16,16 Z M15,14 L15,10 L16,10 C17.1045695,10 18,10.8954305 18,12 C18,13.1045695 17.1045695,14 16,14 L15,14 Z"></path>
</svg>
`;

export default qualityIcon;
