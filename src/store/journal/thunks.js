import { collection, doc, setDoc } from 'firebase/firestore/lite'

import { FirebaseDB } from '../../firebase'
import { loadNotes } from '../../journal/helpers'

import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes
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

export function selectedActiveNode() {
  return async (dispatch) => {
    const notesRef = collection(FirebaseDB, 'notes')

    console.log(notesRef)

    const note = await setDoc(doc(notesRef, '9UAZYtKvJ8fd6BOASqOB'))

    console.log(`noteThunks:' ${note}`)
    // dispatch(setActiveNote(note))
  }
}
