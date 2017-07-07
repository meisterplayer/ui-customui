import globalStyles from '../global-styles.scss';
import createClassNameString from '../../lib/createClassNameString';

const fullscreenExitIcon = (cssClass) => `
<svg class="${createClassNameString(globalStyles.svg, cssClass)}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M19.009222,10 L14.990778,10 C14.7222103,10 14.4756305,9.88929026 14.2882292,9.7071733 C14.1095857,9.5280898 14,9.28148024 14,9.00922203 L14,4.99077797 C14,4.45097518 14.4472481,4 14.9989566,4 L16.0010434,4 C16.5573397,4 17,4.44358641 17,4.99077797 L17,7 L19.009222,7 C19.5490248,7 20,7.44724809 20,7.99895656 L20,9.00104344 C20,9.55733967 19.5564136,10 19.009222,10 Z M19.009222,14 C19.5564136,14 20,14.4426603 20,14.9989566 L20,16.0010434 C20,16.5527519 19.5490248,17 19.009222,17 L17,17 L17,19.009222 C17,19.5564136 16.5573397,20 16.0010434,20 L14.9989566,20 C14.4472481,20 14,19.5490248 14,19.009222 L14,14.990778 C14,14.7185198 14.1095857,14.4719102 14.2882292,14.2928267 C14.4756305,14.1107097 14.7222103,14 14.990778,14 L19.009222,14 Z M4.99077797,10 C4.44358641,10 4,9.55733967 4,9.00104344 L4,7.99895656 C4,7.44724809 4.45097518,7 4.99077797,7 L7,7 L7,4.99077797 C7,4.44358641 7.44266033,4 7.99895656,4 L9.00104344,4 C9.55275191,4 10,4.45097518 10,4.99077797 L10,9.00922203 C10,9.28148024 9.89041432,9.5280898 9.71177076,9.7071733 C9.52436947,9.88929026 9.27778974,10 9.00922203,10 L4.99077797,10 Z M4.99077797,14 L9.00922203,14 C9.27778974,14 9.52436947,14.1107097 9.71177076,14.2928267 C9.89041432,14.4719102 10,14.7185198 10,14.990778 L10,19.009222 C10,19.5490248 9.55275191,20 9.00104344,20 L7.99895656,20 C7.44266033,20 7,19.5564136 7,19.009222 L7,17 L4.99077797,17 C4.45097518,17 4,16.5527519 4,16.0010434 L4,14.9989566 C4,14.4426603 4.44358641,14 4.99077797,14 Z"></path>
</svg>
`;

export default fullscreenExitIcon;