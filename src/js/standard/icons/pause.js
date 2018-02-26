import globalStyles from '../global-styles.scss';
import createClassNameString from '../../lib/createClassNameString';

const pauseIcon = cssClass => `
<svg class="${createClassNameString(globalStyles.svg, cssClass)}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M6,4.66712976 C6,4.29868417 6.44335318,4 7.0093689,4 L8.9906311,4 C9.54809015,4 10,4.29831281 10,4.66712976 L10,19.3328702 C10,19.7013158 9.55664682,20 8.9906311,20 L7.0093689,20 C6.45190985,20 6,19.7016872 6,19.3328702 L6,4.66712976 Z M14,4.66712976 C14,4.29868417 14.4433532,4 15.0093689,4 L16.9906311,4 C17.5480902,4 18,4.29831281 18,4.66712976 L18,19.3328702 C18,19.7013158 17.5566468,20 16.9906311,20 L15.0093689,20 C14.4519098,20 14,19.7016872 14,19.3328702 L14,4.66712976 Z" id="pause"></path>
</svg>
`;

export default pauseIcon;
