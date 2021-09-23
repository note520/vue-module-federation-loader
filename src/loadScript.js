/**
 * 动态创建SCRIPT加载JS
 */
'use strict';
import { typeOf } from './utils'

function setAttributes(script, attrs) {
    for (let attr in attrs) {
        script.setAttribute(attr, attrs[attr]);
    }
}

function stdOnEnd (script) {
   return new Promise((resolve, reject) => {
       script.onload = function () {
           this.onerror = this.onload = null;
           resolve(script)
       };
       script.onerror = function () {
           // this.onload = null here is necessary
           // because even IE9 works not like others
           this.onerror = this.onload = null;
           reject(new Error('Failed to load ' + this.src))
       }
   })
}

function ieOnEnd (script, cb) {
    return new Promise((resolve, reject) => {
        script.onreadystatechange = function () {
            if (this.readyState !== 'complete' && this.readyState !=='loaded') return;
            this.onreadystatechange = null;
            resolve(script) // there is no way to catch loading errors in IE8
        }
    })
}

// 根据属性移除script
export function removeAttrScript(attrs) {
    if(!attrs){
        return false
    }
    let scriptNodes = this.getAttrScript(attrs);
    scriptNodes.forEach(item=>{
        item.remove();
    })
}

export function getAttrScript(attrs) {
    let scriptNodes = [];
    if(typeOf(attrs)==='string'){
        scriptNodes = document.querySelectorAll(`script[${attrs}]`);
    }else {
        for (let attr in attrs) {
            scriptNodes = document.querySelectorAll(`script[${attr}=${attrs[attr]}]`);
        }
    }
    return scriptNodes;
}

export default function loadScript (src, opts={}) {
    return new Promise((resolve, reject) => {
        let head = document.head || document.getElementsByTagName('head')[0];
        let script = document.createElement('script');

        script.type = opts.type || 'text/javascript';
        script.charset = opts.charset || 'utf8';
        script.async = 'async' in opts ? !!opts.async : true;
        script.src = src;

        if (opts.attrs) {
            setAttributes(script, opts.attrs)
        }

        if (opts.text) {
            script.text = '' + opts.text
        }

        let onend = 'onload' in script ? stdOnEnd : ieOnEnd;
        onend(script).then(script=>{
            resolve(script);
        }).catch((err)=>{
            reject(err);
        });
        // some good legacy browsers (firefox) fail the 'in' detection above
        // so as a fallback we always set onload
        // old IE will ignore this and new IE will set onload
        if (!script.onload) {
            stdOnEnd(script).then(script=>{
                resolve(script);
            }).catch(err=>{
                reject(err);
            });
        }

        head.appendChild(script)
    })
}
