export enum FetchTypes {
  entries = 'entries',
}

export enum PostTypes {
  login = 'login',
}

const API_PATH = 'http://localhost/api/';

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

export const postData = (
  type: string,
  body: Record<any, unknown>
): Promise<any> => {
  return fetch(`${API_PATH}${PostTypes[type as PostTypes]}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => response.json());
};
