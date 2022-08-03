export const API_URL: string = process.env.API_URL || 'http://localhost:3007'
export const gitRepoBaseUrl: string | undefined =
    process.env.NODE_ENV === 'test'
        ? process.env.REACT_APP_BASE_URL
        : process.env.GIT_REPO_BASE_URL
