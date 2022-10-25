export const newNote = {
  title: '',
  body: '',
  date: new Date().getTime()
}

export const imageUpload = [
  'https://foto4.jpg',
  'https://foto5.jpg',
  'https://foto6.jpg'
]

export const notes = [
  {
    id: 'ABC123',
    title: 'Note 1',
    body: 'bla bla bla',
    date: new Date().getTime(),
    imageUrls: imageUpload
  },
  {
    id: 'DEF456',
    title: 'Note 2',
    body: '',
    date: new Date().getTime()
  },
  {
    id: 'GHI789',
    title: 'Note 3',
    body: 'This is the 3 note',
    date: new Date().getTime()
  }
]

export const updatedNote = {
  id: 'DEF456',
  title: 'Note 2',
  body: 'updated Note from the testing',
  date: new Date().getTime()
}

export const activeNote = {
  id: 'DEF456',
  title: '',
  body: '',
  date: new Date().getTime(),
  imageUrls: []
}

// --STATES-------------------------

export const initialState = {
  isSaving: false,
  savedMessage: '',
  notes: [],
  active: null
}

export const stateWithNotes = {
  isSaving: false,
  savedMessage: '',
  notes,
  active: null
}

export const stateWithActiveNote = {
  isSaving: false,
  savedMessage: '',
  notes,
  active: activeNote
}
