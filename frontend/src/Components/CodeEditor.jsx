import React, { useEffect, useRef } from 'react'
import CodeMirror from 'codemirror'
import './Css/codeEditor.css'
import '../socket'
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/theme/blackboard.css'
import 'codemirror/mode/javascript/javascript';

function CodeEditor({ socketref, id , syncCode}) {
  const coderef = useRef(null);

  useEffect(() => {
    const init = async () => {
      coderef.current = CodeMirror.fromTextArea(document.getElementById('text'), {
        mode: { name: 'javascript', json: true },
        theme: 'blackboard',
        autoCloseTag: true,
        autoCloseBrackets: true,
        lineNumbers: true,

      })
     
      coderef.current.on('change', (instance, change) => {
        const { origin } = change;
        var code = instance.getValue();
        if (!(origin === 'setValue')) {
          socketref.current.emit("codeChange", {
            id,
            code
          })
        }
      })


    }
    init();
  }, [])

  useEffect(() => {
    if(socketref.current) {
      socketref.current.on('code', ({ code }) => {
        if (code !== null) {
          syncCode(code);
          coderef.current.setValue(code);
        }
      })
     }
  }, [socketref.current])


  return (
    <>
      <textarea id='text'></textarea>
    </>
  )
}

export default CodeEditor