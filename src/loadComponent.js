/**
 * 动态加载vue组件
 */
'use strict';
export function loadComponent (scope, module){
    return async () => {
        await __webpack_init_sharing__("default");
        const container = window[scope];
        await container.init(__webpack_share_scopes__.default);
        const factory = await window[scope].get(module);
        return factory();
    };
}

export default ()=> loadComponent
