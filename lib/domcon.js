class domcon {

    constructor (name, attrs, inner) {

        if (attrs === undefined)
            attrs = {};

        this[0] = this;

        let jqs = $('<'+name+'></'+name+'>');
        for (let attr_name in attrs)
            jqs.attr(attr_name, attrs[attr_name]);

        this._jqs = jqs;

        if (typeof inner === 'string') {
            jqs.text(inner);
        } else if (typeof inner === 'object') {
            for (let i = 0; i < inner.length; i++) {
                let child = inner[i];
                let child_name = child[0];
                let child_attrs = child[1];
                let child_inner = child[2];
                let child_name_alt = child[3];
                let child_dc = new domcon(
                    child_name, child_attrs, child_inner, child_name_alt
                );
                jqs.append(child_dc.jquery());
                let nav_name = child_name_alt || child_name;
                if (this[nav_name] === undefined) {
                    this[nav_name] = child_dc;
                } else {
                    if (this[nav_name] instanceof domcon) {
                        let nav_first = this[nav_name];
                        this[nav_name] = [];
                        this[nav_name].push(nav_first);
                    }
                    this[nav_name].push(child_dc);
                }
            }
        }

    }

    append_to (to) {

        $(to).append(this._jqs);

        return this;

    }

    jquery () {

        return this._jqs;

    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { default: domcon };
} else {
    window.domcon = domcon;
}
