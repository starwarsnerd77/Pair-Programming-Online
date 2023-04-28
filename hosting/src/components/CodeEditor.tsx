import { useEffect, useState } from "react"
import Editor, { useMonaco } from '@monaco-editor/react';

// type CodeEditorProps = {
//     onChange: (action: string, value: string) => {},
//     language: string,
//     code: string,
//     theme: string
// }

export const CodeEditor = () => {
    const monaco = useMonaco();

    useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    if (monaco) {
        console.log('here is the monaco instance:', monaco);
    }
    }, [monaco]);

    return (
        <div>
            <Editor
                height="75vh"
                width="75vw"
                defaultValue="# some comment"
                defaultLanguage="python"
            />
        </div>
    );
};