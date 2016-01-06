'use strict';

/* global describe, it, beforeEach, afterEach */

require('should'); // extends Object with `should`

var regExpLIKE = require('../src/');

function test(like, regex) {
    it('regExpLIKE(\'' + like + '\') ==== ' + regex.toString(), function() {
        regExpLIKE(like).toString().should.equal(regex.toString());
    });
}

describe('regExpLIKE that', function() {
    it('is a function', function() {
        regExpLIKE.should.be.a.Function();
    });
    it('returns a RegExp object', function() {
        (regExpLIKE('abc') instanceof RegExp).should.be.True();
    });
    describe('when tested against a literal string', function() {
        describe('literal match (no wildcards, sets, or ranges)', function() {
            test('testing', /^testing$/);
        });
        describe('literal containing reserved regex characters', function() {
            test('.\\+*?^$(){}=!<>|:[]', /^\.\\\+\*\?\^\$\(\)\{\}\=\!\<\>\|\:\[\]$/);
        });
    });
    describe('when tested against a string with a LIKE wildcard', function() {
        describe('trailing wildcard match', function() {
            test('testing($1.25)%', /^testing\(\$1\.25\)/);
        });
        describe('leading wildcard match', function() {
            test('%testing($1.25)', /testing\(\$1\.25\)$/);
        });
        describe('leading and trailing wildcard match', function() {
            test('%testing($1.25)%', /testing\(\$1\.25\)/);
        });
        describe('embedded wildcard match', function() {
            test('test%ing($1.25)', /^test.*ing\(\$1\.25\)$/);
        });
        describe('leading and trailing and embedded wildcard match', function() {
            test('%test%ing($1.25)%', /test.*ing\(\$1\.25\)/);
        });
    });
    describe('when tested against a string with a LIKE wild character', function() {
        describe('trailing wild character match', function() {
            test('testing($1.25)_', /^testing\(\$1\.25\).$/);
        });
        describe('leading wild character match', function() {
            test('_testing($1.25)', /^.testing\(\$1\.25\)$/);
        });
        describe('leading and trailing wild character match', function() {
            test('_testing($1.25)_', /^.testing\(\$1\.25\).$/);
        });
        describe('embedded wild character match', function() {
            test('test_ing($1.25)', /^test.ing\(\$1\.25\)$/);
        });
    });
    describe('when tested against a string with a LIKE wildcard and a LIKE wild character', function() {
        describe('leading and trailing wildcard + wild character match', function() {
            test('%_testing($1.25)_%', /.testing\(\$1\.25\)./);
        });
        describe('leading and trailing wild character + wildcard match', function() {
            test('_%testing($1.25)%_', /^..*testing\(\$1\.25\).*.$/);
        });
        describe('leading and trailing wildcard + wild character + wildcard match', function() {
            test('%_%testing($1.25)%_%', /..*testing\(\$1\.25\).*./);
        });
    });
    describe('when tested against a string with a LIKE set', function() {
        describe('set containing no reserved characters', function() {
            test('testing($[123].25)', /^testing\(\$[123]\.25\)$/);
        });
        describe('set containing no reserved characters', function() {
            test('testing($[1^23].25)', /^testing\(\$[1\^23]\.25\)$/);
        });
        describe('two sets containing no reserved characters', function() {
            test('te[xs]ting($[123].25)', /^te[xs]ting\(\$[123]\.25\)$/);
        });
        describe('set containing a reserved character', function() {
            test('testing([$¢]1.25)', /^testing\([\$¢]1\.25\)$/);
        });
    });
    describe('when tested against a string with a LIKE range', function() {
        describe('range containing no reserved characters', function() {
            test('testing($[1-5].25)', /^testing\(\$[1-5]\.25\)$/);
        });
        describe('two ranges containing no reserved characters', function() {
            test('te[xs]ting($[1-5].25)', /^te[xs]ting\(\$[1-5]\.25\)$/);
        });
        describe('range containing a reserved character', function() {
            test('testing([$-¢]1.25)', /^testing\([\$-¢]1\.25\)$/);
        });
    });
    describe('when tested against a string with a LIKE anti-set', function() {
        describe('anti-set containing no reserved characters', function() {
            test('testing($[^123].25)', /^testing\(\$[123]\.25\)$/);
        });
        describe('anti-set containing no reserved characters', function() {
            test('testing($[^1^23].25)', /^testing\(\$[1\^23]\.25\)$/);
        });
        describe('two anti-sets containing no reserved characters', function() {
            test('te[xs]ting($[^123].25)', /^te[xs]ting\(\$[123]\.25\)$/);
        });
        describe('anti-set containing a reserved character', function() {
            test('testing([^$¢]1.25)', /^testing\([\$¢]1\.25\)$/);
        });
    });
    describe('when tested against a string with a LIKE anti-range', function() {
        describe('anti-range containing no reserved characters', function() {
            test('testing($[^1-5].25)', /^testing\(\$[1-5]\.25\)$/);
        });
        describe('two anti-ranges containing no reserved characters', function() {
            test('te[xs]ting($[^1-5].25)', /^te[xs]ting\(\$[1-5]\.25\)$/);
        });
        describe('anti-range containing a reserved character', function() {
            test('testing([^$-¢]1.25)', /^testing\([\$-¢]1\.25\)$/);
        });
    });
    it('test ignore case option');
});
