import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'

import { FirebaseDB } from '../../firebase'
import { fileUpload, loadNotes } from '../../journal/helpers'

import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
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

export function startUploadingFiles(files = []) {
  return async (dispatch) => {
    dispatch(setSaving())
    const fileUploadPromises = []

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const photosUrls = await Promise.all(fileUploadPromises)

    dispatch(setPhotosToActiveNote(photosUrls))
  }
}

export function startDeletingNote() {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const { active: note } = getState().journal
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

    await deleteDoc(docRef)
    dispatch(deleteNoteById(note.id))
  }
}
