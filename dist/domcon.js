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
            this.length = 1;

            var ele = document.createElement(name);
            for (var attr_name in attrs) {
                ele.setAttribute(attr_name, attrs[attr_name]);
            }this.e = ele;
            this._ele_name = name;
            this._parent = parent;
            this._nav_id = name_alt || name;

            if (typeof inner === 'string') {
                ele.innerHTML = inner;
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
                    var nav_id = child_dc._nav_id;
                    ele.appendChild(child_dc.e);
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

            function default_child(name, parent) {

                if (name === 'tr') {
                    if (parent === undefined) return undefined;else if (parent._ele_name === 'tbody') return {
                        'name': 'td',
                        'attrs': {}
                    };else if (parent._ele_name === 'thead') return {
                        'name': 'th',
                        'attrs': {}
                    };else if (parent._ele_name === 'table') return {
                        'name': 'th',
                        'attrs': {}
                    };else return undefined;
                }

                return undefined;
            }

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
                        var default_child_info = default_child(name, parent);
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
            if (a instanceof Array) return con_strict.apply(this, a);else return con_terse.call(this, a, b);
        } else {
            throw new Error('the first argument must be a string or an object');
        }
    }

    _createClass(domcon, [{
        key: 'extend',
        value: function extend(a, b, c, d, e) {

            if (typeof a !== 'string' && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object') throw new Error('the first argument must be a string or an object');

            var child_dc = typeof a === 'string' ? new domcon(a, b, c, d, e, this) : a instanceof Array ? new domcon(a[0], a[1], a[2], a[3], a[4], this) : new domcon(a, this);

            var nav_id = child_dc._nav_id;
            this.e.appendChild(child_dc.e);
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

            return this;
        }
    }, {
        key: 'append_to',
        value: function append_to(parent) {

            if (parent instanceof domcon) {
                parent.e.appendChild(this.e);
                this._parent = parent;
            } else {
                parent.appendChild(this.e);
            }

            return this;
        }
    }, {
        key: 'append',
        value: function append(child) {

            if (child instanceof domcon) this.e.appendChild(child.e);else this.e.appendChild(child);

            return this;
        }
    }]);

    return domcon;
}();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { default: domcon };
} else if (typeof window !== 'undefined') {
    window.domcon = domcon;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9kb21jb24uanMiXSwibmFtZXMiOlsiZG9tY29uIiwiYSIsImIiLCJjIiwiZCIsImUiLCJjb25fc3RyaWN0IiwibmFtZSIsImF0dHJzIiwiaW5uZXIiLCJuYW1lX2FsdCIsInBhcmVudCIsInVuZGVmaW5lZCIsImxlbmd0aCIsImVsZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImF0dHJfbmFtZSIsInNldEF0dHJpYnV0ZSIsIl9lbGVfbmFtZSIsIl9wYXJlbnQiLCJfbmF2X2lkIiwiaW5uZXJIVE1MIiwiQXJyYXkiLCJpIiwiY2hpbGQiLCJjaGlsZF9kYyIsImNoaWxkX25hbWUiLCJjaGlsZF9hdHRycyIsImNoaWxkX2lubmVyIiwiY2hpbGRfbmFtZV9hbHQiLCJuYXZfaWQiLCJhcHBlbmRDaGlsZCIsIm5hdl9maXJzdCIsInB1c2giLCJjb25fdGVyc2UiLCJkZXNjciIsImRlZmF1bHRfY2hpbGQiLCJkZXNjcl9rZXlzIiwiT2JqZWN0Iiwia2V5cyIsIkVycm9yIiwibWF0Y2giLCJleGVjIiwiYXR0cnNfZGVzY3IiLCJzcGxpdCIsImZvckVhY2giLCJhZCIsImVxdWFsc19pbmRleCIsImluZGV4T2YiLCJzdWJzdHIiLCJtYXAiLCJkZWZhdWx0X2NoaWxkX2luZm8iLCJjYWxsIiwiYXBwbHkiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmYXVsdCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBTUEsTTtBQUVGLG9CQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkMsQ0FBbkIsRUFBc0JDLENBQXRCLEVBQXlCQyxDQUF6QixFQUE0QjtBQUFBOztBQUV4QixpQkFBU0MsVUFBVCxDQUFxQkMsSUFBckIsRUFBMkJDLEtBQTNCLEVBQWtDQyxLQUFsQyxFQUF5Q0MsUUFBekMsRUFBbURDLE1BQW5ELEVBQTJEOztBQUV2RCxnQkFBSUgsVUFBVUksU0FBZCxFQUNJSixRQUFRLEVBQVI7O0FBRUosaUJBQUssQ0FBTCxJQUFVLElBQVY7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LE1BQUwsSUFBZSxFQUFmO0FBQ0EseUJBQUtBLE1BQUwsRUFBYUcsSUFBYixDQUFrQkQsU0FBbEI7QUFDSDtBQUNELHFCQUFLRixNQUFMLEVBQWFHLElBQWIsQ0FBa0JSLFFBQWxCO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUVIOzs7a0NBRVVmLE0sRUFBUTs7QUFFZixnQkFBSUEsa0JBQWtCWCxNQUF0QixFQUE4QjtBQUMxQlcsdUJBQU9OLENBQVAsQ0FBUzJCLFdBQVQsQ0FBcUIsS0FBSzNCLENBQTFCO0FBQ0EscUJBQUtlLE9BQUwsR0FBZVQsTUFBZjtBQUNILGFBSEQsTUFHTztBQUNIQSx1QkFBT3FCLFdBQVAsQ0FBbUIsS0FBSzNCLENBQXhCO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUVIOzs7K0JBRU9vQixLLEVBQU87O0FBRVgsZ0JBQUlBLGlCQUFpQnpCLE1BQXJCLEVBQ0ksS0FBS0ssQ0FBTCxDQUFPMkIsV0FBUCxDQUFtQlAsTUFBTXBCLENBQXpCLEVBREosS0FHSSxLQUFLQSxDQUFMLENBQU8yQixXQUFQLENBQW1CUCxLQUFuQjs7QUFFSixtQkFBTyxJQUFQO0FBRUg7Ozs7OztBQUtMLElBQUksT0FBTzhCLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUMsT0FBT0EsT0FBT0MsT0FBZCxLQUEwQixXQUEvRCxFQUE0RTtBQUN4RUQsV0FBT0MsT0FBUCxHQUFpQixFQUFFQyxTQUFTekQsTUFBWCxFQUFqQjtBQUNILENBRkQsTUFFTyxJQUFJLE9BQU8wRCxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ3RDQSxXQUFPMUQsTUFBUCxHQUFnQkEsTUFBaEI7QUFDSCIsImZpbGUiOiJkb21jb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBkb21jb24ge1xuXG4gICAgY29uc3RydWN0b3IgKGEsIGIsIGMsIGQsIGUpIHtcblxuICAgICAgICBmdW5jdGlvbiBjb25fc3RyaWN0IChuYW1lLCBhdHRycywgaW5uZXIsIG5hbWVfYWx0LCBwYXJlbnQpIHtcblxuICAgICAgICAgICAgaWYgKGF0dHJzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgYXR0cnMgPSB7fTtcblxuICAgICAgICAgICAgdGhpc1swXSA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDE7XG5cbiAgICAgICAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICAgICAgICAgICAgZm9yIChsZXQgYXR0cl9uYW1lIGluIGF0dHJzKVxuICAgICAgICAgICAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoYXR0cl9uYW1lLCBhdHRyc1thdHRyX25hbWVdKTtcblxuICAgICAgICAgICAgdGhpcy5lICAgICAgICAgPSBlbGU7XG4gICAgICAgICAgICB0aGlzLl9lbGVfbmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQgICA9IHBhcmVudDtcbiAgICAgICAgICAgIHRoaXMuX25hdl9pZCAgID0gbmFtZV9hbHQgfHwgbmFtZTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbm5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBlbGUuaW5uZXJIVE1MID0gaW5uZXI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbm5lciA9PT0gJ29iamVjdCcgJiYgaW5uZXIgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5uZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gaW5uZXJbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZF9kYztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZF9uYW1lID0gY2hpbGRbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRfYXR0cnMgPSBjaGlsZFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZF9pbm5lciA9IGNoaWxkWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkX25hbWVfYWx0ID0gY2hpbGRbM107XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kYyA9IG5ldyBkb21jb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9hdHRycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9pbm5lcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9uYW1lX2FsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGMgPSBuZXcgZG9tY29uKGNoaWxkLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgbmF2X2lkID0gY2hpbGRfZGMuX25hdl9pZDtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmFwcGVuZENoaWxkKGNoaWxkX2RjLmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tuYXZfaWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbbmF2X2lkXSA9IGNoaWxkX2RjO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbbmF2X2lkXSBpbnN0YW5jZW9mIGRvbWNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYXZfZmlyc3QgPSB0aGlzW25hdl9pZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tuYXZfaWRdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tuYXZfaWRdLnB1c2gobmF2X2ZpcnN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbbmF2X2lkXS5wdXNoKGNoaWxkX2RjKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY29uX3RlcnNlIChkZXNjciwgcGFyZW50KSB7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlZmF1bHRfY2hpbGQgKG5hbWUsIHBhcmVudCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09ICd0cicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGFyZW50Ll9lbGVfbmFtZSA9PT0gJ3Rib2R5JylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAndGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhdHRycyc6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGFyZW50Ll9lbGVfbmFtZSA9PT0gJ3RoZWFkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAndGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhdHRycyc6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGFyZW50Ll9lbGVfbmFtZSA9PT0gJ3RhYmxlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAndGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhdHRycyc6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBkZXNjcl9rZXlzID0gT2JqZWN0LmtleXMoZGVzY3IpO1xuICAgICAgICAgICAgaWYgKGRlc2NyX2tleXMubGVuZ3RoICE9PSAxKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2FsbGluZyBkb21jb24gY29uc3RydWN0b3Igd2l0aCBhbiBvYmplY3QgcGFyYW1ldGVyLCBvbmx5IGEgc2luZ2xlIGtleSBpcyBwZXJtaXR0ZWQnKTtcblxuICAgICAgICAgICAgbGV0IG1hdGNoID0gL14oXFxTKz8pKHxcXC8oXFxTKz8pKSh8XFxbKC4qKVxcXSkkLy5leGVjKGRlc2NyX2tleXNbMF0pO1xuICAgICAgICAgICAgaWYgKCFtYXRjaClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZWxlbWVudCBkZXNjcmlwdGlvbiBcIicrZGVzY3IrJ1wiJyk7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgbGV0IG5hbWVfYWx0ID0gbWF0Y2hbM107XG4gICAgICAgICAgICBsZXQgYXR0cnNfZGVzY3IgPSBtYXRjaFs1XTtcbiAgICAgICAgICAgIGxldCBhdHRycyA9IHt9O1xuICAgICAgICAgICAgaWYgKGF0dHJzX2Rlc2NyICE9PSB1bmRlZmluZWQgJiYgYXR0cnNfZGVzY3IgIT09ICcnKVxuICAgICAgICAgICAgICAgIGF0dHJzX2Rlc2NyLnNwbGl0KC8sLykuZm9yRWFjaCgoYWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVxdWFsc19pbmRleCA9IGFkLmluZGV4T2YoJz1cIicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXF1YWxzX2luZGV4ID09PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhdHRyaWJ1dGUgZGVzY3JpcHRpb24gXCInK2FkKydcIicpO1xuICAgICAgICAgICAgICAgICAgICBhdHRyc1thZC5zdWJzdHIoMCwgZXF1YWxzX2luZGV4KV0gPSBhZC5zdWJzdHIoZXF1YWxzX2luZGV4ICsgMiwgYWQubGVuZ3RoIC0gZXF1YWxzX2luZGV4IC0gMyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCBpbm5lcjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVzY3JbZGVzY3Jfa2V5c1swXV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaW5uZXIgPSBkZXNjcltkZXNjcl9rZXlzWzBdXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5uZXIgPSBkZXNjcltkZXNjcl9rZXlzWzBdXS5tYXAoKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBBcnJheSB8fCB0eXBlb2YgZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRfY2hpbGRfaW5mbyA9IGRlZmF1bHRfY2hpbGQobmFtZSwgcGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0X2NoaWxkX2luZm8gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RvIG5vdCBrbm93IHdoYXQgZWxlbWVudCB0byBpbmNsdWRlIGZvciBcIicrZSsnXCInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbZGVmYXVsdF9jaGlsZF9pbmZvLm5hbWUsIGRlZmF1bHRfY2hpbGRfaW5mby5hdHRycywgZV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cHJlc3Npb24gXCInK2UrJ1wiIG5vdCB1bmRlcnN0b29kJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbl9zdHJpY3QuY2FsbCh0aGlzLCBuYW1lLCBhdHRycywgaW5uZXIsIG5hbWVfYWx0LCBwYXJlbnQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uX3N0cmljdC5jYWxsKHRoaXMsIGEsIGIsIGMsIGQsIGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uX3N0cmljdC5hcHBseSh0aGlzLCBhKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uX3RlcnNlLmNhbGwodGhpcywgYSwgYik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIG9iamVjdCcpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHRlbmQgKGEsIGIsIGMsIGQsIGUpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGEgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBhICE9PSAnb2JqZWN0JylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gb2JqZWN0Jyk7XG5cbiAgICAgICAgbGV0IGNoaWxkX2RjID0gdHlwZW9mIGEgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG5ldyBkb21jb24oYSwgYiwgYywgZCwgZSwgdGhpcylcbiAgICAgICAgICAgIDogYSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgPyBuZXcgZG9tY29uKGFbMF0sIGFbMV0sIGFbMl0sIGFbM10sIGFbNF0sIHRoaXMpXG4gICAgICAgICAgICAgICAgOiBuZXcgZG9tY29uKGEsIHRoaXMpO1xuXG4gICAgICAgIGxldCBuYXZfaWQgPSBjaGlsZF9kYy5fbmF2X2lkO1xuICAgICAgICB0aGlzLmUuYXBwZW5kQ2hpbGQoY2hpbGRfZGMuZSk7XG4gICAgICAgIGlmICh0aGlzW25hdl9pZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpc1tuYXZfaWRdID0gY2hpbGRfZGM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpc1tuYXZfaWRdIGluc3RhbmNlb2YgZG9tY29uKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hdl9maXJzdCA9IHRoaXNbbmF2X2lkXTtcbiAgICAgICAgICAgICAgICB0aGlzW25hdl9pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzW25hdl9pZF0ucHVzaChuYXZfZmlyc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpc1tuYXZfaWRdLnB1c2goY2hpbGRfZGMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBhcHBlbmRfdG8gKHBhcmVudCkge1xuXG4gICAgICAgIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBkb21jb24pIHtcbiAgICAgICAgICAgIHBhcmVudC5lLmFwcGVuZENoaWxkKHRoaXMuZSk7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgYXBwZW5kIChjaGlsZCkge1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIGRvbWNvbilcbiAgICAgICAgICAgIHRoaXMuZS5hcHBlbmRDaGlsZChjaGlsZC5lKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5lLmFwcGVuZENoaWxkKGNoaWxkKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxufVxuXG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7IGRlZmF1bHQ6IGRvbWNvbiB9O1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5kb21jb24gPSBkb21jb247XG59XG4iXX0=
//# sourceMappingURL=domcon.js.map
