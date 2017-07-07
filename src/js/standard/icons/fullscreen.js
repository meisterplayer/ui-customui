import globalStyles from '../global-styles.scss';
import createClassNameString from '../../lib/createClassNameString';

const fullscreenIcon = (cssClass) => `
<svg class="${createClassNameString(globalStyles.svg, cssClass)}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M14.990778,4 L19.009222,4 C19.2777897,4 19.5243695,4.11070974 19.7117708,4.2928267 C19.8904143,4.4719102 20,4.71851976 20,4.99077797 L20,9.00922203 C20,9.54902482 19.5527519,10 19.0010434,10 L17.9989566,10 C17.4426603,10 17,9.55641359 17,9.00922203 L17,7 L14.990778,7 C14.4509752,7 14,6.55275191 14,6.00104344 L14,4.99895656 C14,4.44266033 14.4435864,4 14.990778,4 Z M14.990778,20 C14.4435864,20 14,19.5573397 14,19.0010434 L14,17.9989566 C14,17.4472481 14.4509752,17 14.990778,17 L17,17 L17,14.990778 C17,14.4435864 17.4426603,14 17.9989566,14 L19.0010434,14 C19.5527519,14 20,14.4509752 20,14.990778 L20,19.009222 C20,19.2814802 19.8904143,19.5280898 19.7117708,19.7071733 C19.5243695,19.8892903 19.2777897,20 19.009222,20 L14.990778,20 Z M9.00922203,4 C9.55641359,4 10,4.44266033 10,4.99895656 L10,6.00104344 C10,6.55275191 9.54902482,7 9.00922203,7 L7,7 L7,9.00922203 C7,9.55641359 6.55733967,10 6.00104344,10 L4.99895656,10 C4.44724809,10 4,9.54902482 4,9.00922203 L4,4.99077797 C4,4.71851976 4.10958568,4.4719102 4.28822924,4.2928267 C4.47563053,4.11070974 4.72221026,4 4.99077797,4 L9.00922203,4 Z M9.00922203,20 L4.99077797,20 C4.72221026,20 4.47563053,19.8892903 4.28822924,19.7071733 C4.10958568,19.5280898 4,19.2814802 4,19.009222 L4,14.990778 C4,14.4509752 4.44724809,14 4.99895656,14 L6.00104344,14 C6.55733967,14 7,14.4435864 7,14.990778 L7,17 L9.00922203,17 C9.54902482,17 10,17.4472481 10,17.9989566 L10,19.0010434 C10,19.5573397 9.55641359,20 9.00922203,20 Z"></path>
</svg>`;

export default fullscreenIcon;