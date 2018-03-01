'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var domcon = function () {
    function domcon(a, b, c, d, e) {
        _classCallCheck(this, domcon);

        function con_strict(name, attrs, inner, name_alt, parent) {

            if (attrs === undefined) attrs = {};

            this[0] = this;

            var jqs = $('<' + name + '></' + name + '>');
            for (var attr_name in attrs) {
                jqs.attr(attr_name, attrs[attr_name]);
            }this._jqs = jqs;
            this._ele_name = name;
            this._parent = parent;
            this._nav_id = name_alt || name;

            if (typeof inner === 'string') {
                jqs.text(inner);
            } else if ((typeof inner === 'undefined' ? 'undefined' : _typeof(inner)) === 'object' && inner instanceof Array) {
                for (var i = 0; i < inner.length; i++) {
                    var child = inner[i];
                    var child_dc = void 0;
                    if (child instanceof Array) {
                        var child_name = child[0];
                        var child_attrs = child[1];
                        var child_inner = child[2];
                        var child_name_alt = child[3];
                        child_dc = new domcon(child_name, child_attrs, child_inner, child_name_alt, this);
                    } else {
                        child_dc = new domcon(child, this);
                    }
                    var nav_id = child_dc.nav_id();
                    jqs.append(child_dc.jquery());
                    if (this[nav_id] === undefined) {
                        this[nav_id] = child_dc;
                    } else {
                        if (this[nav_id] instanceof domcon) {
                            var nav_first = this[nav_id];
                            this[nav_id] = [];
                            this[nav_id].push(nav_first);
                        }
                        this[nav_id].push(child_dc);
                    }
                }
            }
        }

        function con_terse(descr, parent) {

            var descr_keys = Object.keys(descr);
            if (descr_keys.length !== 1) throw new Error('calling domcon constructor with an object parameter, only a single key is permitted');

            var match = /^(\S+?)(|\/(\S+?))(|\[(.*)\])$/.exec(descr_keys[0]);
            if (!match) throw new Error('invalid element description "' + descr + '"');
            var name = match[1];
            var name_alt = match[3];
            var attrs_descr = match[5];
            var attrs = {};
            if (attrs_descr !== undefined && attrs_descr !== '') attrs_descr.split(/,/).forEach(function (ad) {
                var equals_index = ad.indexOf('="');
                if (equals_index === -1) throw new Error('invalid attribute description "' + ad + '"');
                attrs[ad.substr(0, equals_index)] = ad.substr(equals_index + 2, ad.length - equals_index - 3);
            });

            var inner = void 0;
            if (typeof descr[descr_keys[0]] === 'string') {
                inner = descr[descr_keys[0]];
            } else {
                inner = descr[descr_keys[0]].map(function (e) {
                    if (e instanceof Array || (typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object') {
                        return e;
                    } else if (typeof e === 'string') {
                        var default_child_info = domcon.default_child(name, parent);
                        if (default_child_info === undefined) throw new Error('do not know what element to include for "' + e + '"');
                        return [default_child_info.name, default_child_info.attrs, e];
                    } else {
                        throw new Error('expression "' + e + '" not understood');
                    }
                });
            }

            return con_strict.call(this, name, attrs, inner, name_alt, parent);
        }

        if (typeof a === 'string') {
            return con_strict.call(this, a, b, c, d, e);
        } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
            return con_terse.call(this, a, b);
        }
    }

    _createClass(domcon, [{
        key: 'append_to',
        value: function append_to(to) {

            $(to).append(this._jqs);

            return this;
        }
    }, {
        key: 'jquery',
        value: function jquery() {

            return this._jqs;
        }
    }, {
        key: 'nav_id',
        value: function nav_id() {

            return this._nav_id;
        }
    }, {
        key: 'ele_name',
        value: function ele_name() {

            return this._ele_name;
        }
    }], [{
        key: 'default_child',
        value: function default_child(name, parent) {

            if (name === 'tr') {
                if (parent === undefined) return undefined;
                if (parent.ele_name() === 'tbody') return {
                    'name': 'td',
                    'attrs': {}
                };
                if (parent.ele_name() === 'table') return {
                    'name': 'th',
                    'attrs': {}
                };
            }

            return undefined;
        }
    }]);

    return domcon;
}();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { default: domcon };
} else {
    window.domcon = domcon;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9kb21jb24uanMiXSwibmFtZXMiOlsiZG9tY29uIiwiYSIsImIiLCJjIiwiZCIsImUiLCJjb25fc3RyaWN0IiwibmFtZSIsImF0dHJzIiwiaW5uZXIiLCJuYW1lX2FsdCIsInBhcmVudCIsInVuZGVmaW5lZCIsImpxcyIsIiQiLCJhdHRyX25hbWUiLCJhdHRyIiwiX2pxcyIsIl9lbGVfbmFtZSIsIl9wYXJlbnQiLCJfbmF2X2lkIiwidGV4dCIsIkFycmF5IiwiaSIsImxlbmd0aCIsImNoaWxkIiwiY2hpbGRfZGMiLCJjaGlsZF9uYW1lIiwiY2hpbGRfYXR0cnMiLCJjaGlsZF9pbm5lciIsImNoaWxkX25hbWVfYWx0IiwibmF2X2lkIiwiYXBwZW5kIiwianF1ZXJ5IiwibmF2X2ZpcnN0IiwicHVzaCIsImNvbl90ZXJzZSIsImRlc2NyIiwiZGVzY3Jfa2V5cyIsIk9iamVjdCIsImtleXMiLCJFcnJvciIsIm1hdGNoIiwiZXhlYyIsImF0dHJzX2Rlc2NyIiwic3BsaXQiLCJmb3JFYWNoIiwiYWQiLCJlcXVhbHNfaW5kZXgiLCJpbmRleE9mIiwic3Vic3RyIiwibWFwIiwiZGVmYXVsdF9jaGlsZF9pbmZvIiwiZGVmYXVsdF9jaGlsZCIsImNhbGwiLCJ0byIsImVsZV9uYW1lIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQU1BLE07QUFFRixvQkFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEI7QUFBQTs7QUFFeEIsaUJBQVNDLFVBQVQsQ0FBcUJDLElBQXJCLEVBQTJCQyxLQUEzQixFQUFrQ0MsS0FBbEMsRUFBeUNDLFFBQXpDLEVBQW1EQyxNQUFuRCxFQUEyRDs7QUFFdkQsZ0JBQUlILFVBQVVJLFNBQWQsRUFDSUosUUFBUSxFQUFSOztBQUVKLGlCQUFLLENBQUwsSUFBVSxJQUFWOztBQUVBLGdCQUFJSyxNQUFN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QURMO0FBRUgsNkJBQVM7QUFGTixpQkFBUDtBQUlQOztBQUVELG1CQUFPNUMsU0FBUDtBQUVIOzs7Ozs7QUFLTCxJQUFJLE9BQU82QyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDLE9BQU9BLE9BQU9DLE9BQWQsS0FBMEIsV0FBL0QsRUFBNEU7QUFDeEVELFdBQU9DLE9BQVAsR0FBaUIsRUFBRUMsU0FBUzNELE1BQVgsRUFBakI7QUFDSCxDQUZELE1BRU87QUFDSDRELFdBQU81RCxNQUFQLEdBQWdCQSxNQUFoQjtBQUNIIiwiZmlsZSI6ImRvbWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIGRvbWNvbiB7XG5cbiAgICBjb25zdHJ1Y3RvciAoYSwgYiwgYywgZCwgZSkge1xuXG4gICAgICAgIGZ1bmN0aW9uIGNvbl9zdHJpY3QgKG5hbWUsIGF0dHJzLCBpbm5lciwgbmFtZV9hbHQsIHBhcmVudCkge1xuXG4gICAgICAgICAgICBpZiAoYXR0cnMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBhdHRycyA9IHt9O1xuXG4gICAgICAgICAgICB0aGlzWzBdID0gdGhpcztcblxuICAgICAgICAgICAgbGV0IGpxcyA9ICQoJzwnK25hbWUrJz48LycrbmFtZSsnPicpO1xuICAgICAgICAgICAgZm9yIChsZXQgYXR0cl9uYW1lIGluIGF0dHJzKVxuICAgICAgICAgICAgICAgIGpxcy5hdHRyKGF0dHJfbmFtZSwgYXR0cnNbYXR0cl9uYW1lXSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2pxcyAgICAgID0ganFzO1xuICAgICAgICAgICAgdGhpcy5fZWxlX25hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50ICAgPSBwYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLl9uYXZfaWQgICA9IG5hbWVfYWx0IHx8IG5hbWU7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5uZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAganFzLnRleHQoaW5uZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5uZXIgPT09ICdvYmplY3QnICYmIGlubmVyIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlubmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IGlubmVyW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRfZGM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRfbmFtZSA9IGNoaWxkWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkX2F0dHJzID0gY2hpbGRbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRfaW5uZXIgPSBjaGlsZFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZF9uYW1lX2FsdCA9IGNoaWxkWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGMgPSBuZXcgZG9tY29uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfYXR0cnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfaW5uZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfbmFtZV9hbHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX2RjID0gbmV3IGRvbWNvbihjaGlsZCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hdl9pZCA9IGNoaWxkX2RjLm5hdl9pZCgpO1xuICAgICAgICAgICAgICAgICAgICBqcXMuYXBwZW5kKGNoaWxkX2RjLmpxdWVyeSgpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbbmF2X2lkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW25hdl9pZF0gPSBjaGlsZF9kYztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW25hdl9pZF0gaW5zdGFuY2VvZiBkb21jb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmF2X2ZpcnN0ID0gdGhpc1tuYXZfaWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbbmF2X2lkXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbbmF2X2lkXS5wdXNoKG5hdl9maXJzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW25hdl9pZF0ucHVzaChjaGlsZF9kYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNvbl90ZXJzZSAoZGVzY3IsIHBhcmVudCkge1xuXG4gICAgICAgICAgICBsZXQgZGVzY3Jfa2V5cyA9IE9iamVjdC5rZXlzKGRlc2NyKTtcbiAgICAgICAgICAgIGlmIChkZXNjcl9rZXlzLmxlbmd0aCAhPT0gMSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbGxpbmcgZG9tY29uIGNvbnN0cnVjdG9yIHdpdGggYW4gb2JqZWN0IHBhcmFtZXRlciwgb25seSBhIHNpbmdsZSBrZXkgaXMgcGVybWl0dGVkJyk7XG5cbiAgICAgICAgICAgIGxldCBtYXRjaCA9IC9eKFxcUys/KSh8XFwvKFxcUys/KSkofFxcWyguKilcXF0pJC8uZXhlYyhkZXNjcl9rZXlzWzBdKTtcbiAgICAgICAgICAgIGlmICghbWF0Y2gpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGVsZW1lbnQgZGVzY3JpcHRpb24gXCInK2Rlc2NyKydcIicpO1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgIGxldCBuYW1lX2FsdCA9IG1hdGNoWzNdO1xuICAgICAgICAgICAgbGV0IGF0dHJzX2Rlc2NyID0gbWF0Y2hbNV07XG4gICAgICAgICAgICBsZXQgYXR0cnMgPSB7fTtcbiAgICAgICAgICAgIGlmIChhdHRyc19kZXNjciAhPT0gdW5kZWZpbmVkICYmIGF0dHJzX2Rlc2NyICE9PSAnJylcbiAgICAgICAgICAgICAgICBhdHRyc19kZXNjci5zcGxpdCgvLC8pLmZvckVhY2goKGFkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcXVhbHNfaW5kZXggPSBhZC5pbmRleE9mKCc9XCInKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVxdWFsc19pbmRleCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYXR0cmlidXRlIGRlc2NyaXB0aW9uIFwiJythZCsnXCInKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnNbYWQuc3Vic3RyKDAsIGVxdWFsc19pbmRleCldID0gYWQuc3Vic3RyKGVxdWFsc19pbmRleCArIDIsIGFkLmxlbmd0aCAtIGVxdWFsc19pbmRleCAtIDMpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgaW5uZXI7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlc2NyW2Rlc2NyX2tleXNbMF1dID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlubmVyID0gZGVzY3JbZGVzY3Jfa2V5c1swXV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlubmVyID0gZGVzY3JbZGVzY3Jfa2V5c1swXV0ubWFwKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgQXJyYXkgfHwgdHlwZW9mIGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0X2NoaWxkX2luZm8gPSBkb21jb24uZGVmYXVsdF9jaGlsZChuYW1lLCBwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRfY2hpbGRfaW5mbyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZG8gbm90IGtub3cgd2hhdCBlbGVtZW50IHRvIGluY2x1ZGUgZm9yIFwiJytlKydcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtkZWZhdWx0X2NoaWxkX2luZm8ubmFtZSwgZGVmYXVsdF9jaGlsZF9pbmZvLmF0dHJzLCBlXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwcmVzc2lvbiBcIicrZSsnXCIgbm90IHVuZGVyc3Rvb2QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29uX3N0cmljdC5jYWxsKHRoaXMsIG5hbWUsIGF0dHJzLCBpbm5lciwgbmFtZV9hbHQsIHBhcmVudCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25fc3RyaWN0LmNhbGwodGhpcywgYSwgYiwgYywgZCwgZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uX3RlcnNlLmNhbGwodGhpcywgYSwgYik7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFwcGVuZF90byAodG8pIHtcblxuICAgICAgICAkKHRvKS5hcHBlbmQodGhpcy5fanFzKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGpxdWVyeSAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2pxcztcblxuICAgIH1cblxuICAgIG5hdl9pZCAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX25hdl9pZDtcblxuICAgIH1cblxuICAgIGVsZV9uYW1lICgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZWxlX25hbWU7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdF9jaGlsZCAobmFtZSwgcGFyZW50KSB7XG5cbiAgICAgICAgaWYgKG5hbWUgPT09ICd0cicpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHBhcmVudC5lbGVfbmFtZSgpID09PSAndGJvZHknKVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICduYW1lJzogJ3RkJyxcbiAgICAgICAgICAgICAgICAgICAgJ2F0dHJzJzoge30sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuZWxlX25hbWUoKSA9PT0gJ3RhYmxlJylcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICd0aCcsXG4gICAgICAgICAgICAgICAgICAgICdhdHRycyc6IHt9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgfVxuXG59XG5cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHsgZGVmYXVsdDogZG9tY29uIH07XG59IGVsc2Uge1xuICAgIHdpbmRvdy5kb21jb24gPSBkb21jb247XG59XG4iXX0=
//# sourceMappingURL=domcon.js.map
