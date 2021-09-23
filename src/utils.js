
export function typeOf (val) {
    let type_of = typeof val;
    type_of = type_of.toLocaleLowerCase();
    if ("object" === type_of) {
        let call = Object.prototype.toString.call(val);
        // call = (call.toLocaleLowerCase()).substring(8, call.length - 1);
        call = call.replace(/\[object\s|\]/g, "").toLocaleLowerCase();
        return call;
    } else {
        return type_of;
    }
}