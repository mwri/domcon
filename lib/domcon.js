class domcon {

    constructor (a, b, c, d, e) {

        function con_strict (name, attrs, inner, name_alt, parent) {

            if (attrs === undefined)
                attrs = {};

            this[0] = this;

            let jqs = $('<'+name+'></'+name+'>');
            for (let attr_name in attrs)
                jqs.attr(attr_name, attrs[attr_name]);

            this._jqs      = jqs;
            this._ele_name = name;
            this._parent   = parent;
            this._nav_id   = name_alt || name;

            if (typeof inner === 'string') {
                jqs.text(inner);
            } else if (typeof inner === 'object' && inner instanceof Array) {
                for (let i = 0; i < inner.length; i++) {
                    let child = inner[i];
                    let child_dc;
                    if (child instanceof Array) {
                        let child_name = child[0];
                        let child_attrs = child[1];
                        let child_inner = child[2];
                        let child_name_alt = child[3];
                        child_dc = new domcon(
                            child_name,
                            child_attrs,
                            child_inner,
                            child_name_alt,
                            this
                        );
                    } else {
                        child_dc = new domcon(child, this);
                    }
                    let nav_id = child_dc.nav_id();
                    jqs.append(child_dc.jquery());
                    if (this[nav_id] === undefined) {
                        this[nav_id] = child_dc;
                    } else {
                        if (this[nav_id] instanceof domcon) {
                            let nav_first = this[nav_id];
                            this[nav_id] = [];
                            this[nav_id].push(nav_first);
                        }
                        this[nav_id].push(child_dc);
                    }
                }
            }

        }

        function con_terse (descr, parent) {

            let descr_keys = Object.keys(descr);
            if (descr_keys.length !== 1)
                throw new Error('calling domcon constructor with an object parameter, only a single key is permitted');

            let match = /^(\S+?)(|\/(\S+?))(|\[(.*)\])$/.exec(descr_keys[0]);
            if (!match)
                throw new Error('invalid element description "'+descr+'"');
            let name = match[1];
            let name_alt = match[3];
            let attrs_descr = match[5];
            let attrs = {};
            if (attrs_descr !== undefined && attrs_descr !== '')
                attrs_descr.split(/,/).forEach((ad) => {
                    let equals_index = ad.indexOf('="');
                    if (equals_index === -1)
                        throw new Error('invalid attribute description "'+ad+'"');
                    attrs[ad.substr(0, equals_index)] = ad.substr(equals_index + 2, ad.length - equals_index - 3);
                });

            let inner;
            if (typeof descr[descr_keys[0]] === 'string') {
                inner = descr[descr_keys[0]];
            } else {
                inner = descr[descr_keys[0]].map((e) => {
                    if (e instanceof Array || typeof e === 'object') {
                        return e;
                    } else if (typeof e === 'string') {
                        let default_child_info = domcon.default_child(name, parent);
                        if (default_child_info === undefined)
                            throw new Error('do not know what element to include for "'+e+'"');
                        return [default_child_info.name, default_child_info.attrs, e];
                    } else {
                        throw new Error('expression "'+e+'" not understood');
                    }
                });
            }

            return con_strict.call(this, name, attrs, inner, name_alt, parent);

        }

        if (typeof a === 'string') {
            return con_strict.call(this, a, b, c, d, e);
        } else if (typeof a === 'object') {
            return con_terse.call(this, a, b);
        }

    }

    append_to (to) {

        $(to).append(this._jqs);

        return this;

    }

    jquery () {

        return this._jqs;

    }

    nav_id () {

        return this._nav_id;

    }

    ele_name () {

        return this._ele_name;

    }

    static default_child (name, parent) {

        if (name === 'tr') {
            if (parent === undefined)
                return undefined;
            if (parent.ele_name() === 'tbody')
                return {
                    'name': 'td',
                    'attrs': {},
                };
            if (parent.ele_name() === 'table')
                return {
                    'name': 'th',
                    'attrs': {},
                };
        }

        return undefined;

    }

}


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { default: domcon };
} else {
    window.domcon = domcon;
}
