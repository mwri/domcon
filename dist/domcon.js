'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var domcon = function () {
    function domcon(name, attrs, inner) {
        _classCallCheck(this, domcon);

        if (attrs === undefined) attrs = {};

        this[0] = this;

        var jqs = $('<' + name + '></' + name + '>');
        for (var attr_name in attrs) {
            jqs.attr(attr_name, attrs[attr_name]);
        }this._jqs = jqs;

        if (typeof inner === 'string') {
            jqs.text(inner);
        } else if ((typeof inner === 'undefined' ? 'undefined' : _typeof(inner)) === 'object') {
            for (var i = 0; i < inner.length; i++) {
                var child = inner[i];
                var child_name = child[0];
                var child_attrs = child[1];
                var child_inner = child[2];
                var child_name_alt = child[3];
                var child_dc = new domcon(child_name, child_attrs, child_inner, child_name_alt);
                jqs.append(child_dc.jquery());
                var nav_name = child_name_alt || child_name;
                if (this[nav_name] === undefined) {
                    this[nav_name] = child_dc;
                } else {
                    if (this[nav_name] instanceof domcon) {
                        var nav_first = this[nav_name];
                        this[nav_name] = [];
                        this[nav_name].push(nav_first);
                    }
                    this[nav_name].push(child_dc);
                }
            }
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
    }]);

    return domcon;
}();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { default: domcon };
} else {
    window.domcon = domcon;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9kb21jb24uanMiXSwibmFtZXMiOlsiZG9tY29uIiwibmFtZSIsImF0dHJzIiwiaW5uZXIiLCJ1bmRlZmluZWQiLCJqcXMiLCIkIiwiYXR0cl9uYW1lIiwiYXR0ciIsIl9qcXMiLCJ0ZXh0IiwiaSIsImxlbmd0aCIsImNoaWxkIiwiY2hpbGRfbmFtZSIsImNoaWxkX2F0dHJzIiwiY2hpbGRfaW5uZXIiLCJjaGlsZF9uYW1lX2FsdCIsImNoaWxkX2RjIiwiYXBwZW5kIiwianF1ZXJ5IiwibmF2X25hbWUiLCJuYXZfZmlyc3QiLCJwdXNoIiwidG8iLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmYXVsdCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBTUEsTTtBQUVGLG9CQUFhQyxJQUFiLEVBQW1CQyxLQUFuQixFQUEwQkMsS0FBMUIsRUFBaUM7QUFBQTs7QUFFN0IsWUFBSUQsVUFBVUUsU0FBZCxFQUNJRixRQUFRLEVBQVI7O0FBRUosYUFBSyxDQUFMLElBQVUsSUFBVjs7QUFFQSxZQUFJRyxNQUFNQyxFQUFFLE1BQUlMLElBQUosR0FBUyxLQUFULEdBQWVBLElBQWYsR0FBb0IsR0FBdEIsQ0FBVjtBQUNBLGFBQUssSUFBSU0sU0FBVCxJQUFzQkwsS0FBdEI7QUFDSUcsZ0JBQUlHLElBQUosQ0FBU0QsU0FBVCxFQUFvQkwsTUFBTUssU0FBTixDQUFwQjtBQURKLFNBR0EsS0FBS0UsSUFBTCxHQUFZSixHQUFaOztBQUVBLFlBQUksT0FBT0YsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUMzQkUsZ0JBQUlLLElBQUosQ0FBU1AsS0FBVDtBQUNILFNBRkQsTUFFTyxJQUFJLFFBQU9BLEtBQVAseUNBQU9BLEtBQVAsT0FBaUIsUUFBckIsRUFBK0I7QUFDbEMsaUJBQUssSUFBSVEsSUFBSSxDQUFiLEVBQWdCQSxJQUFJUixNQUFNUyxNQUExQixFQUFrQ0QsR0FBbEMsRUFBdUM7QUFDbkMsb0JBQUlFLFFBQVFWLE1BQU1RLENBQU4sQ0FBWjtBQUNBLG9CQUFJRyxhQUFhRCxNQUFNLENBQU4sQ0FBakI7QUFDQSxvQkFBSUUsY0FBY0YsTUFBTSxDQUFOLENBQWxCO0FBQ0Esb0JBQUlHLGNBQWNILE1BQU0sQ0FBTixDQUFsQjtBQUNBLG9CQUFJSSxpQkFBaUJKLE1BQU0sQ0FBTixDQUFyQjtBQUNBLG9CQUFJSyxXQUFXLElBQUlsQixNQUFKLENBQ1hjLFVBRFcsRUFDQ0MsV0FERCxFQUNjQyxXQURkLEVBQzJCQyxjQUQzQixDQUFmO0FBR0FaLG9CQUFJYyxNQUFKLENBQVdELFNBQVNFLE1BQVQsRUFBWDtBQUNBLG9CQUFJQyxXQUFXSixrQkFBa0JILFVBQWpDO0FBQ0Esb0JBQUksS0FBS08sUUFBTCxNQUFtQmpCLFNBQXZCLEVBQWtDO0FBQzlCLHlCQUFLaUIsUUFBTCxJQUFpQkgsUUFBakI7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsd0JBQUksS0FBS0csUUFBTCxhQUEwQnJCLE1BQTlCLEVBQXNDO0FBQ2xDLDRCQUFJc0IsWUFBWSxLQUFLRCxRQUFMLENBQWhCO0FBQ0EsNkJBQUtBLFFBQUwsSUFBaUIsRUFBakI7QUFDQSw2QkFBS0EsUUFBTCxFQUFlRSxJQUFmLENBQW9CRCxTQUFwQjtBQUNIO0FBQ0QseUJBQUtELFFBQUwsRUFBZUUsSUFBZixDQUFvQkwsUUFBcEI7QUFDSDtBQUNKO0FBQ0o7QUFFSjs7OztrQ0FFVU0sRSxFQUFJOztBQUVYbEIsY0FBRWtCLEVBQUYsRUFBTUwsTUFBTixDQUFhLEtBQUtWLElBQWxCOztBQUVBLG1CQUFPLElBQVA7QUFFSDs7O2lDQUVTOztBQUVOLG1CQUFPLEtBQUtBLElBQVo7QUFFSDs7Ozs7O0FBSUwsSUFBSSxPQUFPZ0IsTUFBUCxLQUFrQixXQUFsQixJQUFpQyxPQUFPQSxPQUFPQyxPQUFkLEtBQTBCLFdBQS9ELEVBQTRFO0FBQ3hFRCxXQUFPQyxPQUFQLEdBQWlCLEVBQUVDLFNBQVMzQixNQUFYLEVBQWpCO0FBQ0gsQ0FGRCxNQUVPO0FBQ0g0QixXQUFPNUIsTUFBUCxHQUFnQkEsTUFBaEI7QUFDSCIsImZpbGUiOiJkb21jb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBkb21jb24ge1xuXG4gICAgY29uc3RydWN0b3IgKG5hbWUsIGF0dHJzLCBpbm5lcikge1xuXG4gICAgICAgIGlmIChhdHRycyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgYXR0cnMgPSB7fTtcblxuICAgICAgICB0aGlzWzBdID0gdGhpcztcblxuICAgICAgICBsZXQganFzID0gJCgnPCcrbmFtZSsnPjwvJytuYW1lKyc+Jyk7XG4gICAgICAgIGZvciAobGV0IGF0dHJfbmFtZSBpbiBhdHRycylcbiAgICAgICAgICAgIGpxcy5hdHRyKGF0dHJfbmFtZSwgYXR0cnNbYXR0cl9uYW1lXSk7XG5cbiAgICAgICAgdGhpcy5fanFzID0ganFzO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaW5uZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBqcXMudGV4dChpbm5lcik7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlubmVyID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbm5lci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IGlubmVyW2ldO1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZF9uYW1lID0gY2hpbGRbMF07XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkX2F0dHJzID0gY2hpbGRbMV07XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkX2lubmVyID0gY2hpbGRbMl07XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkX25hbWVfYWx0ID0gY2hpbGRbM107XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkX2RjID0gbmV3IGRvbWNvbihcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRfbmFtZSwgY2hpbGRfYXR0cnMsIGNoaWxkX2lubmVyLCBjaGlsZF9uYW1lX2FsdFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAganFzLmFwcGVuZChjaGlsZF9kYy5qcXVlcnkoKSk7XG4gICAgICAgICAgICAgICAgbGV0IG5hdl9uYW1lID0gY2hpbGRfbmFtZV9hbHQgfHwgY2hpbGRfbmFtZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpc1tuYXZfbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW25hdl9uYW1lXSA9IGNoaWxkX2RjO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW25hdl9uYW1lXSBpbnN0YW5jZW9mIGRvbWNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hdl9maXJzdCA9IHRoaXNbbmF2X25hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tuYXZfbmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbbmF2X25hbWVdLnB1c2gobmF2X2ZpcnN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzW25hdl9uYW1lXS5wdXNoKGNoaWxkX2RjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFwcGVuZF90byAodG8pIHtcblxuICAgICAgICAkKHRvKS5hcHBlbmQodGhpcy5fanFzKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGpxdWVyeSAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2pxcztcblxuICAgIH1cblxufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0geyBkZWZhdWx0OiBkb21jb24gfTtcbn0gZWxzZSB7XG4gICAgd2luZG93LmRvbWNvbiA9IGRvbWNvbjtcbn1cbiJdfQ==
//# sourceMappingURL=domcon.js.map
