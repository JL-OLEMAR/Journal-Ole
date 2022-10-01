import { collection, doc, setDoc } from 'firebase/firestore/lite'

import { FirebaseDB } from '../../firebase'
import { loadNotes } from '../../journal/helpers'

import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote
} from './journalSlice.js'

export function startNewNote() {
  return async (dispatch, getState) => {
    dispatch(savingNewNote())
    const { uid } = getState().auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))

    await setDoc(newDoc, newNote)
    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export function startLoadingNotes() {
  return async (dispatch, getState) => {
    const { uid } = getState().auth // get uidUser from global store
    const notes = await loadNotes(uid)

    dispatch(setNotes(notes))
  }
}

export function startSaveNote() {
  return async (dispatch, getState) => {
    dispatch(setSaving())

    const { uid } = getState().auth
    const { active: note } = getState().journal
    const noteToFireStore = { ...note }

    delete noteToFireStore.id
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

    await setDoc(docRef, noteToFireStore, { merge: true })

    dispatch(updateNote(note))
  }
}
