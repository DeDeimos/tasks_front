export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  export function getAuthorizationToken() {
    const session = localStorage.getItem("session");
    const token = session ? JSON.parse(session).accessToken : undefined;
    return token ? `Bearer ${token}` : undefined;
  }