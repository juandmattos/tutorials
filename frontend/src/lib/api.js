const { REACT_APP_API_URL } = process.env

export const getAllTutorials = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/tutorials`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error('Could not fetch tutorials.')
  }

  return data.tutorials
}

export const getSingleTutorial = async (tutorialId) => {
  const response = await fetch(`${REACT_APP_API_URL}/tutorials/${tutorialId}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error('Could not fetch tutorial.')
  }

  const { title, description, videoUrl, publishedStatus, creator } = data

  const loadedTutorial = {
    id: tutorialId,
    title,
    description,
    videoUrl,
    publishedStatus,
    creator
  }

  return loadedTutorial
}

export const signin = async (userData) => {
  const { email, password } = userData
  const response = await fetch(`${REACT_APP_API_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('No se pudo hacer el signin')
  }
  const data = await response.json()

  return data.userData
}

export const login = async (userData) => {
  const { email, password } = userData
  const response = await fetch(`${REACT_APP_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('No se pudo hacer el login')
  }

  const data = await response.json()

  return data.userData
}

export const deleteTutorial = async (tutorialId, token) => {
  const response = await fetch(`${REACT_APP_API_URL}/tutorials/${tutorialId}`, {
    method: 'Delete',
    body: null,
    headers: {
      Authorization: 'Bearer ' + token
    },
  })

  if (!response.ok) {
    throw new Error('Could not fetch tutorial.')
  }

  const data = await response.json()

  return data
}

export const massDelete = async (token) => {
  const response = await fetch(`${REACT_APP_API_URL}/tutorials/mass_delete`, {
    method: 'Delete',
    body: null,
    headers: {
      Authorization: 'Bearer ' + token
    },
  })

  if (!response.ok) {
    throw new Error('Could not fetch tutorial.')
  }

  return {}
}

export const newTutorial = async (tutorialData, token) => {
  const response = await fetch(`${REACT_APP_API_URL}/tutorials`, {
    method: 'POST',
    body: JSON.stringify(tutorialData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  })

  if (!response.ok) {
    throw new Error('Could not create tutorial.')
  }
  const data = await response.json()

  return data;
}

export const editTutorial = async (id, tutorialData, token) => {
  const response = await fetch(`${REACT_APP_API_URL}/tutorials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tutorialData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  })

  if (!response.ok) {
    throw new Error('Could not edit tutorial.')
  }
  const data = await response.json()

  return data;
}