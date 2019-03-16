const userVariable = 'PersonLoggedIn';

export const userLoggedIn = {
  save: (user) => {
    localStorage.setItem(userVariable, JSON.stringify(user));
  },
  
  remove: () => {
    localStorage.setItem(userVariable, null);
  },
  
  get: () => {
    let user = localStorage.getItem(userVariable);
    
    if (!user) return null;
  
    user = JSON.parse(user);
  
    if (user && user.name) return user;
  
    return null;
  }
}