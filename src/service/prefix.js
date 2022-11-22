import Util from '../common/util'
const protocol = window.location.protocol;
const host = window.location.host;
const main = Util.isYoTaApp() ? 'yotajiaoyou' : 'miyijiaoyou';
const isProduction = host === `h5.${main}.com`;
const isStaging = host === `h5.staging.${main}.com`;

const prefix = {
    domain: isProduction ? `${protocol}//api.${main}.com` : (isStaging ? `${protocol}//api.staging.${main}.com` : `${protocol}//api.dev.${main}.com`),
    path: '/web/'
}
export default prefix;
