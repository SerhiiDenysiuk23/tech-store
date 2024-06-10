export const TOKEN_NAME = 'token'

export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(';').shift() : undefined;
}

export const setCookie = (name: string, value: string, daysToExpire: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}


export const postRequest = async (route: string, data: any, method?: 'POST' | 'PUT') => {
  const token = getCookie(TOKEN_NAME)
  const response = await fetch(`/api/${route}`, {
    method: method ?? 'POST',
    headers: token
      ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie(TOKEN_NAME)}`,
      }
      :{
        'Content-Type': 'application/json',
      },
    body: JSON.stringify(data),
  });


  return response.json()
}

export const getRequest = async (route: string) => {
  const token = getCookie(TOKEN_NAME)

  const response = await fetch(`/api/${route}`, {
    method: 'GET',
    headers: token
      ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie(TOKEN_NAME)}`,
      }
      :{
        'Content-Type': 'application/json',
      },
  });


  return response.json()
}