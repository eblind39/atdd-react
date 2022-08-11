import {FullDataRepo, RepoRoot} from '../types/githubrepo'
import * as repos30Paginated from './repos-30-paginated.json'
import * as repos50Paginated from './repos-50-paginated.json'

const makeFakeResponse = ({totalCount = 0} = {}): FullDataRepo => ({
    total_count: totalCount,
    incomplete_results: false,
    items: [],
})

const makeFakeRepo = ({
    name = 'django-rest-framework-reactive',
    id = 56757919,
} = {}): RepoRoot => ({
    id,
    name,
    html_url: 'https://github.com/qemu/qemu',
    updated_at: '2022-08-02',
    stargazers_count: 6490,
    forks_count: 4118,
    open_issues_count: 0,
    node_id: '',
    full_name: '',
    private: false,
    description: '',
    fork: false,
    url: '',
    forks_url: '',
    keys_url: '',
    collaborators_url: '',
    teams_url: '',
    hooks_url: '',
    issue_events_url: '',
    events_url: '',
    assignees_url: '',
    branches_url: '',
    tags_url: '',
    blobs_url: '',
    git_tags_url: '',
    git_refs_url: '',
    trees_url: '',
    statuses_url: '',
    languages_url: '',
    stargazers_url: '',
    contributors_url: '',
    subscribers_url: '',
    subscription_url: '',
    commits_url: '',
    git_commits_url: '',
    comments_url: '',
    issue_comment_url: '',
    contents_url: '',
    compare_url: '',
    merges_url: '',
    archive_url: '',
    downloads_url: '',
    issues_url: '',
    pulls_url: '',
    milestones_url: '',
    notifications_url: '',
    labels_url: '',
    releases_url: '',
    deployments_url: '',
    created_at: '',
    pushed_at: '',
    git_url: '',
    ssh_url: '',
    clone_url: '',
    svn_url: '',
    homepage: '',
    size: 0,
    watchers_count: 0,
    language: '',
    has_issues: false,
    has_projects: false,
    has_downloads: false,
    has_wiki: false,
    has_pages: false,
    mirror_url: '',
    archived: false,
    disabled: false,
    license: {
        key: '',
        name: '',
        spdx_id: '',
        url: '',
        node_id: '',
    },
    allow_forking: false,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [''],
    visibility: '',
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: '',
    score: 0,
    owner: {
        id: 2137033,
        avatar_url: 'https://avatars.githubusercontent.com/u/2137033?v=4',
        login: '',
        node_id: '',
        gravatar_id: '',
        url: '',
        html_url: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: '',
        site_admin: false,
    },
})

interface ReposPerPageProps {
    currentPage: number
    perPage: number
}

interface ReposListByProps {
    name: string
}

const reposData: string[] = ['go', 'freeCodeCamp', 'laravel', 'Python', 'Java']
const repoList = reposData.map(name =>
    makeFakeRepo({name, id: name.charCodeAt(0)}),
)

const getReposListBy = ({name}: ReposListByProps) =>
    repoList.filter(repo => repo.name === name)

const getReposPerPage = ({currentPage, perPage}: ReposPerPageProps) => {
    return perPage === 30
        ? repos30Paginated[currentPage]
        : repos50Paginated[currentPage]
}

const makeFakeError = () => ({
    // errors: [{resource: 'Search', field: '0', code: 'missing'}],
    message: 'Validation failed',
})

export {
    makeFakeResponse,
    makeFakeRepo,
    getReposListBy,
    getReposPerPage,
    makeFakeError,
}
