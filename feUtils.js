/**
 * @name lsGet
 * @param   {String} key Key
 * @param   {Any=}   def Default value
 * @returns {Any}    Stored data, otherwise def.
 * @description
 * Return stored data by key if exists, otherwise - default value
 */
function lsGet(key, def) {
    var ret;
    if (window.localStorage) {
        ret = window.localStorage.getItem(key);
    }
    return utils.isset(ret) ? ret : def;
}

/**
 * @name lsSet
 * @param   {String} key  Key
 * @param   {Any}    data Data to store
 * @description
 * Stores data to local storage by key
 */
function lsSet(key, data) {
    if (window.localStorage) {
        window.localStorage.setItem(key, data);
    }
}

/**
 * @name lsRemove
 * @param   {String} key  Key
 * @description
 * Removes data from local storage by key
 */
function lsRemove(key) {
    if (window.localStorage) {
        window.localStorage.removeItem(key);
    }
}
