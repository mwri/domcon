(function () {


    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        var jsdom = require('jsdom');
        var { JSDOM } = jsdom;
        let { window } = new JSDOM('<html><head></head><body></body></html>');
        var domcon = require('./../dist/domcon.js').default;
        var jQuery = require('jquery')(window);
        var $ = jQuery;
        require('chai-jasmine');
    } else {
        var domcon = window.domcon;
        var jQuery = window.jQuery;
        var $ = window.$;
    }


    function gen_tests (tests) {

        for (let i = 0; i < tests.length; i++) {
            let test = tests[i];
            let test_name = test.name;
            if (test.strict !== undefined) {
                it(test.name+' (strict)', () => {
                    let bindapply_args = test.strict.args.slice();
                    bindapply_args.unshift(null);
                    let bound_domcon = Function.bind.apply(domcon, bindapply_args);
                    let dc = new bound_domcon();
                    $('body').append(dc.jquery());
                    return test.check(dc);
                });
            }
            if (test.terse !== undefined) {
                it(test.name+' (terse)', () => {
                    let bindapply_args = test.terse.args.slice();
                    bindapply_args.unshift(null);
                    let bound_domcon = Function.bind.apply(domcon, bindapply_args);
                    let dc = new bound_domcon();
                    $('body').append(dc.jquery());
                    return test.check(dc);
                });
            }
        }
    }


    describe('domcon', () => {

        describe('DOM construction', () => {

            beforeEach(() => {
                $('body').empty();
            });

            gen_tests([{
                name: 'element name only',
                strict: { args: ['div'] },
                terse: { args: [{'div': ''}] },
                check: () => {
                    expect($('body > div').length).toBe(1);
                },
            }, {
                name: 'element with empty attribs',
                strict: { args: ['div', {}] },
                terse: { args: [{'div[]': ''}] },
                check: () => { expect($('body > div').length).toBe(1); },
            }, {
                name: 'element with class attrib',
                strict: { args: ['div', {'class': 'foo'}] },
                terse: { args: [{'div[class="foo"]': ''}] },
                check: () => { expect($('body > div.foo').length).toBe(1); },
            }, {
                name: 'element with id attrib',
                strict: { args: ['div', {'id': 'bar'}] },
                terse: { args: [{'div[id="bar"]': ''}] },
                check: () => { expect($('body > div#bar').length).toBe(1); },
            }, {
                name: 'element with id and class attribs',
                strict: { args: ['div', {'class': 'foo', 'id': 'bar'}] },
                terse: { args: [{'div[class="foo",id="bar"]': ''}] },
                check: () => { expect($('body > div.foo#bar').length).toBe(1); },
            }, {
                name: 'element with plain string inner (zero length)',
                strict: { args: ['div', {}, ''] },
                terse: { args: [{'div': ''}] },
                check: () => {
                    expect($('body > div').length).toBe(1);
                    expect($('body > div').text()).toBe('');
                },
            }, {
                name: 'element with plain string inner (length above zero)',
                strict: { args: ['div', {}, 'inside'] },
                terse: { args: [{'div': 'inside'}] },
                check: () => {
                    expect($('body > div').length).toBe(1);
                    expect($('body > div').text()).toBe('inside');
                },
            }, {
                name: 'element with a child element',
                strict: { args: ['div', {}, [ ['div'] ]] },
                terse: { args: [{'div': [ {'div': ''} ]}] },
                check: () => { expect($('body > div > div').length).toBe(1); },
            }, {
                name: 'element with a child element with a child element',
                strict: { args: ['div', {}, [ ['div', {}, [ ['div'] ]] ]] },
                terse: { args: [{'div': [ {'div': [ {'div': ''} ]} ]}] },
                check: () => { expect($('body > div > div > div').length).toBe(1); },
            }, {
                name: 'element with two child elements',
                strict: { args: ['div', {}, [ ['div'], ['div'] ]] },
                terse: { args: [{'div': [ {'div': []},  {'div': []} ]}] },
                check: () => { expect($('body > div > div').length).toBe(2); },
            }, {
                name: 'element with a terse child element',
                strict: { args: ['div', {}, [ {'div': ''} ]] },
                check: () => { expect($('body > div > div').length).toBe(1); },
            }, {
                name: 'element with a strict child element',
                terse: { args: [{'div': [ ['div'] ]}] },
                check: () => { expect($('body > div > div').length).toBe(1); },
            }, {
                name: 'child element assumed th in table,tr',
                terse: { args: [{'table': [ {'tr': [ 'h1', 'h2' ]} ]}] },
                check: () => {
                    expect($('body > table > tr > th').length).toBe(2);
                    expect($('body > table > tr > th:eq(0)').text()).toBe('h1');
                    expect($('body > table > tr > th:eq(1)').text()).toBe('h2');
                },
            }, {
                name: 'child element assumed td in table,tbody,tr',
                terse: { args: [{'table': [ {'tbody': [ {'tr': [ 'c1', 'c2' ]} ]} ]}] },
                check: () => {
                    expect($('body > table > tbody > tr > td').length).toBe(2);
                    expect($('body > table > tbody > tr > td:eq(0)').text()).toBe('c1');
                    expect($('body > table > tbody > tr > td:eq(1)').text()).toBe('c2');
                },
            }]);

        });

        describe('Easy navigation', () => {

            beforeEach(() => {
                $('body').empty();
            });

            gen_tests([{
                name: 'root jquery element is the element inserted in the DOM',
                strict: { args: ['div'] },
                terse: { args: [{'div': ''}] },
                check: (dc) => {
                    expect($('body > div').length).toBe(1);
                    expect(dc.jquery()[0]).toBe($('body > div')[0]);
                },
            }, {
                name: 'first child navigation by element name',
                strict: { args: ['div', {}, [ ['form'] ] ] },
                terse: { args: [{'div': [ {'form': ''} ]}] },
                check: (dc) => {
                    expect($('body > div > form').length).toBe(1);
                    expect(dc.form.jquery()[0]).toBe($('body > div > form')[0]);
                },
            }, {
                name: 'navigation by element name order index works when there is no name clash',
                strict: { args: ['div', {}, [ ['form'] ] ] },
                terse: { args: [{'div': [ {'form': ''} ]}] },
                check: (dc) => {
                    expect($('body > div > form').length).toBe(1);
                    expect(dc.form[0].jquery()[0]).toBe($('body > div > form')[0]);
                },
            }, {
                name: 'second level child navigation by element name',
                strict: { args: ['div', {}, [ ['form', {}, [ ['input'] ] ] ] ] },
                terse: { args: [{'div': [ {'form': [ {'input': ''} ]} ]}] },
                check: (dc) => {
                    expect($('body > div > form > input').length).toBe(1);
                    expect(dc.form.input.jquery()[0]).toBe($('body > div > form > input')[0]);
                },
            }, {
                name: 'navigation by element name becomes array when element names clash',
                strict: { args: ['div', {}, [ ['form', {}, [ ['input'], ['input'] ] ] ] ] },
                terse: { args: [{'div': [ {'form': [ {'input': ''}, {'input': ''} ]} ]}] },
                check: (dc) => {
                    expect($('body > div > form > input').length).toBe(2);
                    expect(dc.form.input instanceof Array).toBe(true);
                },
            }, {
                name: 'navigation by element name order index works when two element names clash',
                strict: { args: ['div', {}, [ ['form', {}, [ ['input'], ['input'] ] ] ] ] },
                terse: { args: [{'div': [ {'form': [ {'input': ''}, {'input': ''} ]} ]}] },
                check: (dc) => {
                    expect($('body > div > form > input').length).toBe(2);
                    expect(dc.form.input[0].jquery()[0]).toBe($('body > div > form > input:eq(0)')[0]);
                    expect(dc.form.input[1].jquery()[0]).toBe($('body > div > form > input:eq(1)')[0]);
                },
            }, {
                name: 'navigation by element name order index works when more element names clash',
                strict: { args: ['div', {}, [ ['form', {}, [ ['input'], ['input'], ['input'] ] ] ] ] },
                terse: { args: [{'div': [ {'form': [ {'input': ''}, {'input': ''}, {'input': ''} ]} ]}] },
                check: (dc) => {
                    expect($('body > div > form > input').length).toBe(3);
                    expect(dc.form.input[0].jquery()[0]).toBe($('body > div > form > input:eq(0)')[0]);
                    expect(dc.form.input[1].jquery()[0]).toBe($('body > div > form > input:eq(1)')[0]);
                    expect(dc.form.input[2].jquery()[0]).toBe($('body > div > form > input:eq(2)')[0]);
                },
            }, {
                name: 'first child navigation by alt name',
                strict: { args: ['div', {}, [ ['form', {}, undefined, 'data'] ] ] },
                terse: { args: [{'div': [ {'form/data': ''} ]}] },
                check: (dc) => {
                    expect($('body > div > form').length).toBe(1);
                    expect(dc.data.jquery()[0]).toBe($('body > div > form')[0]);
                },
            }, {
                name: 'navigation by alt name eliminates element names navigation clash',
                strict: { args: ['div', {}, [ ['form', {}, [ ['input', {}, undefined, 'first'], ['input'] ] ] ] ] },
                terse: { args: [{'div': [ {'form': [ {'input/first': ''}, {'input': ''} ]} ]}] },
                check: (dc) => {
                    expect($('body > div > form > input').length).toBe(2);
                    expect(dc.form.first.jquery()[0]).toBe($('body > div > form > input:eq(0)')[0]);
                    expect(dc.form.input.jquery()[0]).toBe($('body > div > form > input:eq(1)')[0]);
                },
            }]);

        });

        describe('Error conditions (thrown)', () => {

            it('when a terse specification is made with multiple keys', () => {
                try {
                    new domcon({'div': '', 'table': ''});
                    throw new Error('no exception thrown');
                } catch (err) {
                    if (!/only a single key is permitted/.exec(err))
                        throw err;
                }
            });

            it('when a terse specification is made with no keys', () => {
                try {
                    new domcon({});
                    throw new Error('no exception thrown');
                } catch (err) {
                    if (!/only a single key is permitted/.exec(err))
                        throw err;
                }
            });

            it('when a terse specification invalid element name description is given', () => {
                try {
                    new domcon({' foo ': ''});
                    throw new Error('no exception thrown');
                } catch (err) {
                    if (!/invalid/.exec(err))
                        throw err;
                }
            });

            it('when a terse specification invalid attribute description is given', () => {
                try {
                    new domcon({'foo[bat]': ''});
                    throw new Error('no exception thrown');
                } catch (err) {
                    if (!/invalid/.exec(err))
                        throw err;
                }
            });

            it('when a terse specification invalid inner is given', () => {
                try {
                    new domcon({'div': [4]});
                    throw new Error('no exception thrown');
                } catch (err) {
                    if (!/not understood/.exec(err))
                        throw err;
                }
            });

            it('when a terse specification has no default child assumption it can make', () => {
                try {
                    new domcon({'div': [ 'mysterious' ]});
                    throw new Error('no exception thrown');
                } catch (err) {
                    if (!/do not know what element/.exec(err))
                        throw err;
                }
            });

        });

    });

})();
