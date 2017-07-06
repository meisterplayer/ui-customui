import globalStyles from '../global-styles.scss';
import createClassNameString from '../../lib/createClassNameString';


const playIcon = (cssClass) => `
<svg class="${createClassNameString(globalStyles.svg, cssClass)}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M17.5797546,11.3085619 C18.1433363,11.6897833 18.1368179,12.3122745 17.5797546,12.6890866 L7.02045486,19.8316732 C6.4568732,20.2128946 6,19.9252466 6,19.1843471 L6,4.81330147 C6,4.07457175 6.46339158,3.78916316 7.02045486,4.16597534 L17.5797546,11.3085619 Z" id="play"></path>
</svg>
`;

export default playIcon;
