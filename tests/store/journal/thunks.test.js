import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'

import { FirebaseDB } from '../../../src/firebase/config.js'
import { loadNotes } from '../../../src/journal/helpers/loadNotes.js'
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote
} from '../../../src/store/journal/journalSlice.js'
import {
  startDeletingNote,
  startLoadingNotes,
  startNewNote,
  startSaveNote
} from '../../../src/store/journal/thunks.js'

describe('Tests in journal thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('startNewNote should create a new blank note', async () => {
    const uid = 'TEST-UID'
    const newNote = {
      body: '',
      title: '',
      id: expect.any(String),
      date: expect.any(Number)
    }

    // 👀 Return values, ❌ not for promises.
    // Return auth of global status mock.
    getState.mockReturnValue({ auth: { uid } })

    await startNewNote()(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith(savingNewNote())
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(newNote))
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(newNote))

    // Delete all firebase data
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)
    const deletePromises = []

    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)))
    await Promise.all(deletePromises)
  }, 10000)

  test('startLoadingNotes should setNotes notes', async () => {
    const uid = 'TEST-UID'

    getState.mockReturnValue({ auth: { uid } })
    const notes = await loadNotes(uid)

    await startLoadingNotes()(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith(setNotes(notes))
  })

  test('startSaveNote should setSaving and updateNote a note', async () => {
    const uid = 'TEST-UID'
    const note = {
      id: 'ABC123',
      title: '',
      body: '',
      date: 1234567,
      imageUrls: []
    }

    getState.mockReturnValue({ auth: { uid }, journal: { active: note } })
    await startSaveNote()(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith(setSaving())
    expect(dispatch).toHaveBeenCalledWith(updateNote(note))
  })

  test('startDeletingNote should deleteNoteById', async () => {
    const uid = 'TEST-UID'
    const note = {
      id: 'ABC123',
      title: '',
      body: '',
      date: 1234567,
      imageUrls: []
    }

    getState.mockReturnValue({ auth: { uid }, journal: { active: note } })
    await startDeletingNote()(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith(deleteNoteById(note.id))
  })
})
