import React from "react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import CharacterCount from "@tiptap/extension-character-count"
import Placeholder from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import TextStyle from "@tiptap/extension-text-style"

import { Icon, Popup } from "semantic-ui-react"

const MenuBar = ({ editor }) => {
  React.useEffect(()=>{
    if(!editor)
      return null
  },[editor])

  
  const setLink = React.useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  return (
    <>
      <Icon 
        name="undo"
        bordered
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      />
      <Icon 
        name="redo"
        bordered
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      />
      <Icon
        name="bold"
        bordered
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      />
      <Icon
        name="italic"
        bordered
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      />
      <Icon
        name="underline"
        bordered
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      />
      <Icon
        name="strikethrough"
        bordered
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      />
      <Icon
        name="linkify"
        bordered
        onClick={setLink}
        className={editor.isActive('link') ? 'is-active' : ''}
      />
      <Icon
        name="unlinkify"
        bordered
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
      />
      <Popup
        content={
          <>
            <h1 onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} >Text</h1>
            <h2 onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} >Text</h2>
            <h3 onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} >Text</h3>
            <h4 onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} >Text</h4>
            <h5 onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} >Text</h5>
            <h6 onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} >Text</h6>
            <p onClick={() => editor.chain().focus().clearNodes().run()}>Text</p>
          </>
        }
        on='click'
        pinned
        trigger={<Icon name="heading" bordered />}
      />
    </>
  )
} 

const RichTextEditor = ({ value, handleChangeEditor, limit = 10000 }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1,2,3,4,5,6]
        }
      }),
      Link.configure({ openOnClick: false }),
      TextStyle,
      Underline,
      CharacterCount.configure({
        limit
      }),
      Placeholder,
      Typography
    ],
    content: value,
    onUpdate: handleChangeEditor
  })

  return (
    <div className="rich-text-editor">
      {editor && (<>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        <div className="character-count">
          <>{editor.storage.characterCount.characters()} characters</>
        </div>
      </>)}
    </div>
  )
}

export default RichTextEditor