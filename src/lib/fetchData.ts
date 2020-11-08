export enum FetchTypes {
  entries = 'entries',
}

const API_PATH = '/api/';

export const fetchData = (type: string): Promise<any> => {
  return fetch(`${API_PATH}${FetchTypes[type as FetchTypes]}`, {
    credentials: 'include',
  }).then(data => {
    if (!data.ok) {
      throw new Error(
        `Fetch failed with status code ${data.status} - ${data.statusText}`
      );
    }
    return data.json();
  });
};

const postData = (path: string, body: Record<any, unknown>): Promise<any> => {
  return fetch(`${API_PATH}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => response.json());
};

export const submitPassword = async (password: string) => {
  try {
    const response = await postData(`login`, { password });
    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const favEntry = async (id: string) => {
  try {
    const response = await postData(`entries/${id}/fav`, {});
    return response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const submitUpdate = async (id: string, text: string) => {
  try {
    const response = await postData(`entries/${id}/update`, { text });

    if (!response || !response.entry || !response.entry.id) {
      throw new Error('invalid object response');
    }
    return response.entry;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
