'use strict';
import { loadComponent } from './loadComponent'
import loadScript,{ removeAttrScript,getAttrScript } from './loadScript';

class MF {

    constructor(){
        this.loadComponent = loadComponent;
        this.loadScript = loadScript;
        this.removeAttrScript = removeAttrScript;
        this.getAttrScript = getAttrScript;
        this.prefix= 'MF_REMOTE';
        this.keyId = 'mf_id';
        // console.log(this.prefix,this.config);
        return this;
    }
    /**
     * 模块配置信息
     * 获取g_config.$mf_remote
     */
    get config(){
        if(window[`${this.prefix}`]){
            return window[`${this.prefix}`];
        }
        if(!window.g_config || !window.g_config[`${this.prefix}`] || !window.g_config[`${this.prefix}`].length){
            return []
        }
        return window.g_config[`${this.prefix}`];
    }

    /***
     * 懒加载模块调用
     * @param modPath
     */
    lazyLoad(modPath){
        return new Promise(async(resolve, reject) => {
            const modInfo = MF.parsePath(modPath);
            if(!modInfo){
                reject(null);
                return false
            }
            try {
                const appName = modInfo.appName;
                const modName = modInfo.module;
                const curApp = this.getRemoteApp(appName);
                if(!curApp){
                    reject(`${appName} not find config!`);
                }
                const appPath = curApp.url;
                const reqUrl = `${appPath}/${appName}_mf.js`;
                const keyId = `${this.prefix}_${appName}`;
                if(!this.isRepeatJS(keyId)){
                    let attrs = {};
                    attrs[`${this.keyId}`] = keyId;
                    await this.loadScript(reqUrl,{
                        attrs
                    })
                }
                const componentFn = this.loadComponent(appName,`./${modName}`);
                const component = await componentFn();
                resolve(component.default?component.default:component);
            }catch (e){
                console.error('$MF lazyLoad error:',e);
                reject(e);
            }
        })
    }

    /**
     * 移除指定加载模块JS
     * @param appName
     * @returns {boolean}
     */
    removeLoad(appName){
        const keyId = `${this.prefix}_${appName}`;
        let attrs = {};
        attrs[`${this.keyId}`] = keyId;
        const scriptArr = this.getAttrScript(attrs);
        if(!scriptArr || !scriptArr.length){
            console.error(`${appName} removeLoad fail!`);
            return false
        }
        return this.removeAttrScript(attrs);
    }

    /***
     * 移除所有加载模块
     * @returns {boolean}
     */
    removeAllLoad(){
        return this.removeAttrScript(`${this.keyId}`);
    }

    /***
     *  查找远程模块配置信息
     * @param appName
     */
    getRemoteApp(appName){
        return this.config.find(item=>item.name === appName);
    }

    /**
     * 获取远程模块附带参数
     * @param modPath
     */
    getOptions(modPath){
        const modInfo = MF.parsePath(modPath);
        if(!modInfo){
            return null
        }
        const appName = modInfo.appName;
        const modName = modInfo.module;
        const curApp = this.getRemoteApp(appName);
        if(!curApp){
            console.error('$MF getOptions error: 404!')
            return null
        }
        if(!curApp.options){
            return {}
        }
        return curApp.options[`${modName}`] || curApp.options
    }

    /***
     * 解析URL映射到模块
     * @param urlPath
     * @param step
     */
    static parsePath(urlPath,step='/'){
        if(!urlPath){
            return null;
        }
        if(urlPath.indexOf(step)!==-1){
            const urlArr = urlPath.split(step);
            const appName = urlArr[0];
            const module = urlArr[1]?urlArr[1]:'';
           return {
               appName,
               module
           }
        }else {
           return {
               appName:urlPath,
               module:''
           }
        }
    }

    /**
     * head是否已加载模块JS
     */
    isRepeatJS(keyId){
        let head = document.head || document.getElementsByTagName('head')[0];
        const el = head.querySelector(`script[${this.keyId}="${keyId}"]`);
        return !!el;
    }
}

// 挂载全局
if (!window.$MF) {
    window.$MF = new MF();
}

export default $MF;
