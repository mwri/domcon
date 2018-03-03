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
            return con_terse.call(this, a, b);
        } else {
            throw new Error('the first argument must be a string or an object');
        }
    }

    _createClass(domcon, [{
        key: 'append_to',
        value: function append_to(parent_element) {

            parent_element.appendChild(this.e);

            return this;
        }
    }, {
        key: 'append',
        value: function append(child_element) {

            this.e.appendChild(child_element);

            return this;
        }
    }]);

    return domcon;
}();

if (typeof exports !== 'undefined') {
    exports = { default: domcon };
} else if (typeof window !== 'undefined') {
    window.domcon = domcon;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9kb21jb24uanMiXSwibmFtZXMiOlsiZG9tY29uIiwiYSIsImIiLCJjIiwiZCIsImUiLCJjb25fc3RyaWN0IiwibmFtZSIsImF0dHJzIiwiaW5uZXIiLCJuYW1lX2FsdCIsInBhcmVudCIsInVuZGVmaW5lZCIsImVsZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImF0dHJfbmFtZSIsInNldEF0dHJpYnV0ZSIsIl9lbGVfbmFtZSIsIl9wYXJlbnQiLCJfbmF2X2lkIiwiaW5uZXJIVE1MIiwiQXJyYXkiLCJpIiwibGVuZ3RoIiwiY2hpbGQiLCJjaGlsZF9kYyIsImNoaWxkX25hbWUiLCJjaGlsZF9hdHRycyIsImNoaWxkX2lubmVyIiwiY2hpbGRfbmFtZV9hbHQiLCJuYXZfaWQiLCJhcHBlbmRDaGlsZCIsIm5hdl9maXJzdCIsInB1c2giLCJjb25fdGVyc2UiLCJkZXNjciIsImRlZmF1bHRfY2hpbGQiLCJkZXNjcl9rZXlzIiwiT2JqZWN0Iiwia2V5cyIsIkVycm9yIiwibWF0Y2giLCJleGVjIiwiYXR0cnNfZGVzY3IiLCJzcGxpdCIsImZvckVhY2giLCJhZCIsImVxdWFsc19pbmRleCIsImluZGV4T2YiLCJzdWJzdHIiLCJtYXAiLCJkZWZhdWx0X2NoaWxkX2luZm8iLCJjYWxsIiwicGFyZW50X2VsZW1lbnQiLCJjaGlsZF9lbGVtZW50IiwiZXhwb3J0cyIsImRlZmF1bHQiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQU1BLE07QUFFRixvQkFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEI7QUFBQTs7QUFFeEIsaUJBQVNDLFVBQVQsQ0FBcUJDLElBQXJCLEVBQTJCQyxLQUEzQixFQUFrQ0MsS0FBbEMsRUFBeUNDLFFBQXpDLEVBQW1EQyxNQUFuRCxFQUEyRDs7QUFFdkQsZ0JBQUlILFVBQVVJLFNBQWQsRUFDSUosUUFBUSxFQUFSOztBQUVKLGlCQUFL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S0FBSzNCLENBQWhDOztBQUVBLG1CQUFPLElBQVA7QUFFSDs7OytCQUVPa0QsYSxFQUFlOztBQUVuQixpQkFBS2xELENBQUwsQ0FBTzJCLFdBQVAsQ0FBbUJ1QixhQUFuQjs7QUFFQSxtQkFBTyxJQUFQO0FBRUg7Ozs7OztBQUtMLElBQUksT0FBT0MsT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNoQ0EsY0FBVSxFQUFFQyxTQUFTekQsTUFBWCxFQUFWO0FBQ0gsQ0FGRCxNQUVPLElBQUksT0FBTzBELE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDdENBLFdBQU8xRCxNQUFQLEdBQWdCQSxNQUFoQjtBQUNIIiwiZmlsZSI6ImRvbWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIGRvbWNvbiB7XG5cbiAgICBjb25zdHJ1Y3RvciAoYSwgYiwgYywgZCwgZSkge1xuXG4gICAgICAgIGZ1bmN0aW9uIGNvbl9zdHJpY3QgKG5hbWUsIGF0dHJzLCBpbm5lciwgbmFtZV9hbHQsIHBhcmVudCkge1xuXG4gICAgICAgICAgICBpZiAoYXR0cnMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBhdHRycyA9IHt9O1xuXG4gICAgICAgICAgICB0aGlzWzBdID0gdGhpcztcblxuICAgICAgICAgICAgbGV0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBhdHRyX25hbWUgaW4gYXR0cnMpXG4gICAgICAgICAgICAgICAgZWxlLnNldEF0dHJpYnV0ZShhdHRyX25hbWUsIGF0dHJzW2F0dHJfbmFtZV0pO1xuXG4gICAgICAgICAgICB0aGlzLmUgICAgICAgICA9IGVsZTtcbiAgICAgICAgICAgIHRoaXMuX2VsZV9uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudCAgID0gcGFyZW50O1xuICAgICAgICAgICAgdGhpcy5fbmF2X2lkICAgPSBuYW1lX2FsdCB8fCBuYW1lO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlubmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSBpbm5lcjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlubmVyID09PSAnb2JqZWN0JyAmJiBpbm5lciBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbm5lci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBpbm5lcltpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkX2RjO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkX25hbWUgPSBjaGlsZFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZF9hdHRycyA9IGNoaWxkWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkX2lubmVyID0gY2hpbGRbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRfbmFtZV9hbHQgPSBjaGlsZFszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX2RjID0gbmV3IGRvbWNvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX2F0dHJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX2lubmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX25hbWVfYWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kYyA9IG5ldyBkb21jb24oY2hpbGQsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYXZfaWQgPSBjaGlsZF9kYy5fbmF2X2lkO1xuICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kQ2hpbGQoY2hpbGRfZGMuZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW25hdl9pZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tuYXZfaWRdID0gY2hpbGRfZGM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tuYXZfaWRdIGluc3RhbmNlb2YgZG9tY29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hdl9maXJzdCA9IHRoaXNbbmF2X2lkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW25hdl9pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW25hdl9pZF0ucHVzaChuYXZfZmlyc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tuYXZfaWRdLnB1c2goY2hpbGRfZGMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjb25fdGVyc2UgKGRlc2NyLCBwYXJlbnQpIHtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZGVmYXVsdF9jaGlsZCAobmFtZSwgcGFyZW50KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ3RyJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwYXJlbnQuX2VsZV9uYW1lID09PSAndGJvZHknKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICd0ZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2F0dHJzJzoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwYXJlbnQuX2VsZV9uYW1lID09PSAndGFibGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICd0aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2F0dHJzJzoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGRlc2NyX2tleXMgPSBPYmplY3Qua2V5cyhkZXNjcik7XG4gICAgICAgICAgICBpZiAoZGVzY3Jfa2V5cy5sZW5ndGggIT09IDEpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYWxsaW5nIGRvbWNvbiBjb25zdHJ1Y3RvciB3aXRoIGFuIG9iamVjdCBwYXJhbWV0ZXIsIG9ubHkgYSBzaW5nbGUga2V5IGlzIHBlcm1pdHRlZCcpO1xuXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSAvXihcXFMrPykofFxcLyhcXFMrPykpKHxcXFsoLiopXFxdKSQvLmV4ZWMoZGVzY3Jfa2V5c1swXSk7XG4gICAgICAgICAgICBpZiAoIW1hdGNoKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBlbGVtZW50IGRlc2NyaXB0aW9uIFwiJytkZXNjcisnXCInKTtcbiAgICAgICAgICAgIGxldCBuYW1lID0gbWF0Y2hbMV07XG4gICAgICAgICAgICBsZXQgbmFtZV9hbHQgPSBtYXRjaFszXTtcbiAgICAgICAgICAgIGxldCBhdHRyc19kZXNjciA9IG1hdGNoWzVdO1xuICAgICAgICAgICAgbGV0IGF0dHJzID0ge307XG4gICAgICAgICAgICBpZiAoYXR0cnNfZGVzY3IgIT09IHVuZGVmaW5lZCAmJiBhdHRyc19kZXNjciAhPT0gJycpXG4gICAgICAgICAgICAgICAgYXR0cnNfZGVzY3Iuc3BsaXQoLywvKS5mb3JFYWNoKChhZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXF1YWxzX2luZGV4ID0gYWQuaW5kZXhPZignPVwiJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcXVhbHNfaW5kZXggPT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGF0dHJpYnV0ZSBkZXNjcmlwdGlvbiBcIicrYWQrJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzW2FkLnN1YnN0cigwLCBlcXVhbHNfaW5kZXgpXSA9IGFkLnN1YnN0cihlcXVhbHNfaW5kZXggKyAyLCBhZC5sZW5ndGggLSBlcXVhbHNfaW5kZXggLSAzKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IGlubmVyO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZXNjcltkZXNjcl9rZXlzWzBdXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpbm5lciA9IGRlc2NyW2Rlc2NyX2tleXNbMF1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbm5lciA9IGRlc2NyW2Rlc2NyX2tleXNbMF1dLm1hcCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEFycmF5IHx8IHR5cGVvZiBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdF9jaGlsZF9pbmZvID0gZGVmYXVsdF9jaGlsZChuYW1lLCBwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRfY2hpbGRfaW5mbyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZG8gbm90IGtub3cgd2hhdCBlbGVtZW50IHRvIGluY2x1ZGUgZm9yIFwiJytlKydcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtkZWZhdWx0X2NoaWxkX2luZm8ubmFtZSwgZGVmYXVsdF9jaGlsZF9pbmZvLmF0dHJzLCBlXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwcmVzc2lvbiBcIicrZSsnXCIgbm90IHVuZGVyc3Rvb2QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29uX3N0cmljdC5jYWxsKHRoaXMsIG5hbWUsIGF0dHJzLCBpbm5lciwgbmFtZV9hbHQsIHBhcmVudCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25fc3RyaWN0LmNhbGwodGhpcywgYSwgYiwgYywgZCwgZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uX3RlcnNlLmNhbGwodGhpcywgYSwgYik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIG9iamVjdCcpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhcHBlbmRfdG8gKHBhcmVudF9lbGVtZW50KSB7XG5cbiAgICAgICAgcGFyZW50X2VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5lKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGFwcGVuZCAoY2hpbGRfZWxlbWVudCkge1xuXG4gICAgICAgIHRoaXMuZS5hcHBlbmRDaGlsZChjaGlsZF9lbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxufVxuXG5cbmlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzID0geyBkZWZhdWx0OiBkb21jb24gfTtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuZG9tY29uID0gZG9tY29uO1xufVxuIl19
//# sourceMappingURL=domcon.js.map
