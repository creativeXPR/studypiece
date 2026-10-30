import { autocompletion, closeBrackets, closeBracketsKeymap, completeFromList } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap, indentWithTab, undo } from '@codemirror/commands';
import { java } from '@codemirror/lang-java';
import { bracketMatching, indentOnInput, indentUnit, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { drawSelection, EditorView, highlightActiveLine, keymap, lineNumbers } from '@codemirror/view';
import { classHighlighter } from '@lezer/highlight';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

// The Java editor for write-and-run screens. On touch screens a key bar adds the
// symbols phone keyboards hide; its buttons never take focus, so the keyboard stays up.

const WORDS = [
  'public', 'private', 'protected', 'static', 'final', 'abstract', 'class', 'interface', 'extends', 'implements',
  'return', 'void', 'int', 'double', 'boolean', 'char', 'String', 'new', 'this', 'super', 'if', 'else', 'for',
  'while', 'switch', 'case', 'break', 'default', 'try', 'catch', 'finally', 'throw', 'throws', 'null', 'true',
  'false', 'System.out.println', 'ArrayList', 'Math', 'Integer.parseInt', 'Double.parseDouble', '@Override',
].map((label) => ({ label, type: 'keyword' }));

const KEYS = [
  ['⇥', '    '], ['{', '{'], ['}', '}'], ['(', '('], [')', ')'], [';', ';'], ['"', '"'], ['=', '='],
  ['.', '.'], ['[', '['], [']', ']'], ['<', '<'], ['>', '>'], ['+', '+'], ['-', '-'], ['*', '*'],
  ['!', '!'], ['&', '&'], ['|', '|'], ["'", "'"], [',', ','],
];

const CodeEditor = forwardRef(function CodeEditor({ value, onChange, readOnly = false, label = 'Java code editor' }, ref) {
  const host = useRef(null);
  const view = useRef(null);
  const change = useRef(onChange);
  useEffect(() => {
    change.current = onChange;
  });

  useEffect(() => {
    const v = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: value,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          drawSelection(),
          history(),
          indentUnit.of('    '),
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),
          autocompletion({ override: [completeFromList(WORDS)], activateOnTyping: true }),
          java(),
          syntaxHighlighting(classHighlighter),
          keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, indentWithTab]),
          EditorState.readOnly.of(readOnly),
          EditorView.contentAttributes.of({ 'aria-label': label, autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false' }),
          EditorView.updateListener.of((u) => {
            if (u.docChanged) change.current?.(u.state.doc.toString());
          }),
        ],
      }),
    });
    view.current = v;
    return () => v.destroy();
    // The editor owns its text after mount; `value` only seeds it (see setValue below).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readOnly, label]);

  useImperativeHandle(ref, () => ({
    setValue(text) {
      const v = view.current;
      v?.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: text } });
    },
    focus: () => view.current?.focus(),
  }));

  const insert = (text) => {
    const v = view.current;
    if (!v) return;
    v.dispatch(v.state.replaceSelection(text));
    v.focus();
  };

  return (
    <div className={`jv-editor${readOnly ? ' readonly' : ''}`}>
      <div ref={host} className="jv-cm" />
      {!readOnly && (
        <div className="jv-keys" role="toolbar" aria-label="Code symbols">
          {KEYS.map(([k, text]) => (
            <button key={k} type="button" tabIndex={-1} onPointerDown={(e) => e.preventDefault()} onClick={() => insert(text)}
              aria-label={k === '⇥' ? 'Indent' : `Insert ${k}`}>
              {k}
            </button>
          ))}
          <button type="button" tabIndex={-1} className="jv-undo" onPointerDown={(e) => e.preventDefault()}
            onClick={() => view.current && undo(view.current)} aria-label="Undo">
            ↶
          </button>
        </div>
      )}
    </div>
  );
});

export default CodeEditor;
