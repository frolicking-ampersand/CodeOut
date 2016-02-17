jest.dontMock('../codeundertest');

describe('whatever', function() {
  it('should do the do', function() {
    var request = require('../src/components/code-editor/code_editor.js');

    require('../codeundertest')();
    expect(request.get.mock.calls[0][0]).toBe('http://57f4dad48e7a4f7cd171c654226feb5a.proxysheep.com/questions/tagged/jestjs');
  });
});




require('../src/components/code-editor/code_editor.js');