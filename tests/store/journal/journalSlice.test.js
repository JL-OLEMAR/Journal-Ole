import {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  journalSlice,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
} from '../../../src/store/journal/journalSlice.js'
import {
  activeNote,
  imageUpload,
  initialState,
  newNote,
  notes,
  stateWithActiveNote,
  stateWithNotes,
  updatedNote
} from '../fixtures/journalFixture.js'

describe('Tests in journalSlice', () => {
  test('should return the initialState and be called "journal"', () => {
    const state = journalSlice.reducer(initialState, {})

    expect(state).toEqual(initialState)
    expect(journalSlice.name).toBe('journal')
  })

  test('should savingNewNote', () => {
    const state = journalSlice.reducer(initialState, savingNewNote())

    expect(state.isSaving).toBe(true)
  })

  test('should addNewEmptyNote', () => {
    const state = journalSlice.reducer(initialState, addNewEmptyNote(newNote))

    expect(state.notes).toEqual([newNote])
    expect(state.isSaving).toBeFalsy()
  })

  test('should setActiveNote', () => {
    const state = journalSlice.reducer(initialState, setActiveNote(activeNote))

    expect(state.active).toEqual(activeNote)
    expect(state.savedMessage).toBe('')
  })

  test('should setNotes', () => {
    const state = journalSlice.reducer(initialState, setNotes(notes))

    expect(state.notes).toEqual(notes)
    expect(state.notes[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
      imageUrls: expect.any(Array)
    })
  })

  test('should setSaving', () => {
    const state = journalSlice.reducer(initialState, setSaving())

    expect(state.isSaving).toBeTruthy()
    expect(state.savedMessage).toBe('')
  })

  test('should updateNote', () => {
    const state = journalSlice.reducer(stateWithNotes, updateNote(updatedNote))

    expect(state.isSaving).toBeFalsy()
    expect(state.notes[1]).toEqual(updatedNote)
    expect(state.savedMessage).toContain(
      `${updatedNote.title}, updated correctly`
    )
  })

  test('should setPhotosToActiveNote', () => {
    const state = journalSlice.reducer(
      stateWithActiveNote,
      setPhotosToActiveNote(imageUpload)
    )

    expect(state.active.imageUrls).toEqual(imageUpload)
    expect(state.isSaving).toBeFalsy()
  })

  test('should clearNotesLogout', () => {
    const state = journalSlice.reducer(stateWithActiveNote, clearNotesLogout())

    expect(state).toEqual({
      isSaving: false,
      savedMessage: '',
      notes: [],
      active: null
    })
  })

  test('should deleteNoteById', () => {
    const state = journalSlice.reducer(
      stateWithActiveNote,
      deleteNoteById(notes[2].id)
    )

    expect(state.active).toBeNull()
    expect(state.notes).toHaveLength(2)
  })
})
